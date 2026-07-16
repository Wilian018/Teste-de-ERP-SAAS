import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  async create(companyId: string, data: any) {
    return this.prisma.supplier.create({
      data: {
        ...data,
        companyId,
      },
    });
  }

  async findAll(companyId: string) {
    return this.prisma.supplier.findMany({
      where: { companyId },
    });
  }

  async findOne(companyId: string, id: string) {
    return this.prisma.supplier.findFirst({
      where: { id, companyId },
    });
  }

  async update(companyId: string, id: string, data: any) {
    return this.prisma.supplier.update({
      where: { id },
      data,
    });
  }

  async remove(companyId: string, id: string) {
    return this.prisma.supplier.delete({
      where: { id },
    });
  }
}
