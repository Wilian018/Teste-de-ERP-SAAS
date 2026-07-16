import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EventsGateway } from '../../events/events.gateway';

@Injectable()
export class SalesService {
  constructor(
    private prisma: PrismaService,
    private eventsGateway: EventsGateway
  ) {}

  async create(companyId: string, data: any) {
    return this.prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      let totalCost = 0;
      const saleItemsData = [];
      let cashbackPoints = 0;

      for (const item of data.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          include: { promotions: { where: { active: true } } }
        });

        if (!product || product.companyId !== companyId) {
          throw new BadRequestException(`Produto ${item.productId} não encontrado`);
        }

        if (product.stockQty < item.quantity) {
          throw new BadRequestException(`Estoque insuficiente para o produto ${product.name}`);
        }

        let finalPrice = Number(product.salePrice);
        
        // Verifica se há promoções
        if (product.promotions.length > 0) {
          const promo = product.promotions[0];
          if (promo.type === 'QUANTITY_DISCOUNT' && promo.minQuantity && item.quantity >= promo.minQuantity) {
            finalPrice = finalPrice - (finalPrice * (Number(promo.discount) / 100));
          }
        }

        const itemTotal = finalPrice * item.quantity;
        const itemCostTotal = Number(product.costPrice) * item.quantity;

        totalAmount += itemTotal;
        totalCost += itemCostTotal;

        saleItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: finalPrice,
          total: itemTotal,
        });

        await tx.product.update({
          where: { id: item.productId },
          data: { stockQty: { decrement: item.quantity } }
        });
      }

      const sale = await tx.sale.create({
        data: {
          companyId,
          totalAmount,
          status: 'COMPLETED',
          customerId: data.customerId,
          items: {
            create: saleItemsData
          }
        }
      });

      // Lançamento Financeiro Automático
      await tx.financialTransaction.create({
        data: {
          companyId,
          saleId: sale.id,
          type: 'INCOME',
          amount: totalAmount,
          status: 'PAID', // Simplificação: a venda no PDV já entra como paga
          dueDate: new Date()
        }
      });

      // Sistema de Fidelidade (Cashback)
      if (data.customerId) {
        cashbackPoints = Math.floor(totalAmount / 10); // 1 ponto a cada R$10
        await tx.customerPoints.upsert({
          where: { customerId: data.customerId },
          create: { customerId: data.customerId, balance: cashbackPoints },
          update: { balance: { increment: cashbackPoints } }
        });
      }

      // Emite o evento via WebSocket para o Dashboard
      this.eventsGateway.emitNewSale({
        saleId: sale.id,
        totalAmount,
        itemsCount: data.items.length,
      });

      return sale;
    });
  }

  async findAll(companyId: string) {
    return this.prisma.sale.findMany({
      where: { companyId },
      include: {
        items: { include: { product: true } },
        financials: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
