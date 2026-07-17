import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CrmService {
  constructor(private prisma: PrismaService) {}

  async createCampaign(companyId: string, data: any) {
    return this.prisma.marketingCampaign.create({
      data: {
        ...data,
        companyId,
      },
    });
  }

  async getCampaigns(companyId: string) {
    return this.prisma.marketingCampaign.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
