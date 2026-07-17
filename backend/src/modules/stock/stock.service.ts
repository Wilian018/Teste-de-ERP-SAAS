import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  async move(companyId: string, data: any) {
    return this.prisma.$transaction(async (tx) => {
      // Create movement record
      const movement = await tx.stockMovement.create({
        data: {
          companyId,
          productId: data.productId,
          type: data.type,
          quantity: data.quantity,
          reason: data.reason || null,
        },
      });

      // Update product stock
      const product = await tx.product.findFirst({
        where: { id: data.productId, companyId },
      });

      if (!product) {
        throw new Error('Produto não encontrado.');
      }

      let newStock = product.stockQty;
      if (data.type === 'IN') {
        newStock += data.quantity;
      } else if (data.type === 'OUT') {
        newStock -= data.quantity;
      } else if (data.type === 'ADJUSTMENT') {
        newStock = data.quantity; // Explicit set
      }

      await tx.product.update({
        where: { id: data.productId },
        data: { stockQty: newStock },
      });

      return movement;
    });
  }

  async findAll(companyId: string) {
    return this.prisma.stockMovement.findMany({
      where: { companyId },
      include: {
        product: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
