import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async create(companyId: string, data: any) {
    const { supplierId, totalAmount, items } = data;

    if (!items || items.length === 0) {
      throw new BadRequestException('A compra deve conter itens.');
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Criar o Pedido de Compra
      const purchase = await tx.purchaseOrder.create({
        data: {
          companyId,
          supplierId,
          totalAmount,
          status: 'RECEIVED', // Recebido no momento do registro para simplificar o MVP
        },
      });

      // 2. Inserir itens e atualizar estoque
      for (const item of items) {
        await tx.purchaseItem.create({
          data: {
            purchaseOrderId: purchase.id,
            productId: item.productId,
            quantity: item.quantity,
            unitCost: item.unitCost,
          },
        });

        // 3. Incrementar estoque no Produto
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQty: { increment: item.quantity },
            costPrice: item.unitCost // Atualiza custo mais recente
          },
        });
      }

      // 4. Lançar Transação Financeira de Despesa (Contas a Pagar / Pago)
      await tx.financialTransaction.create({
        data: {
          companyId,
          type: 'EXPENSE',
          amount: totalAmount,
          status: 'PAID', // Simplificação do MVP (pago à vista)
          dueDate: new Date(),
        },
      });

      return purchase;
    });
  }

  async findAll(companyId: string) {
    return this.prisma.purchaseOrder.findMany({
      where: { companyId },
      include: {
        supplier: true,
        items: { include: { product: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
