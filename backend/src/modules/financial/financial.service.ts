import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FinancialService {
  constructor(private prisma: PrismaService) {}

  async create(companyId: string, data: any) {
    return this.prisma.financialTransaction.create({
      data: {
        companyId,
        type: data.type,
        description: data.description || 'Lançamento',
        amount: data.amount,
        status: data.status || 'PENDING',
        dueDate: new Date(data.dueDate),
        costCenterId: data.costCenterId || null,
      },
    });
  }

  async findAll(companyId: string) {
    return this.prisma.financialTransaction.findMany({
      where: { companyId },
      orderBy: { dueDate: 'asc' },
    });
  }

  async reconcile(companyId: string, id: string) {
    return this.prisma.financialTransaction.updateMany({
      where: { id, companyId },
      data: { status: 'PAID' },
    });
  }
}
