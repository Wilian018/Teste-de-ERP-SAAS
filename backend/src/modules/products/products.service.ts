import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(companyId: string, data: any) {
    return this.prisma.product.create({
      data: {
        ...data,
        companyId,
      },
    });
  }

  async findAll(companyId: string) {
    return this.prisma.product.findMany({
      where: { companyId },
    });
  }

  async findOne(companyId: string, id: string) {
    return this.prisma.product.findFirst({
      where: { id, companyId },
    });
  }

  async update(companyId: string, id: string, data: any) {
    // Retorna o count de registros atualizados (deve ser 1)
    return this.prisma.product.updateMany({
      where: { id, companyId },
      data,
    });
  }

  async remove(companyId: string, id: string) {
    // Retorna o count de registros deletados (deve ser 1)
    return this.prisma.product.deleteMany({
      where: { id, companyId },
    });
  }
}
