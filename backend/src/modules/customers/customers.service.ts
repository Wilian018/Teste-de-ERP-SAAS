import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(companyId: string, data: any) {
    return this.prisma.customer.create({
      data: {
        ...data,
        companyId,
      },
    });
  }

  async findAll(companyId: string) {
    return this.prisma.customer.findMany({
      where: { companyId },
    });
  }

  async findOne(companyId: string, id: string) {
    return this.prisma.customer.findFirst({
      where: { id, companyId },
    });
  }

  async update(companyId: string, id: string, data: any) {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async remove(companyId: string, id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
