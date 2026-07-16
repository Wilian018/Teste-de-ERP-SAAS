import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SuperAdminGuard } from '../../auth/super-admin.guard';

@Controller('api/admin/companies')
@UseGuards(SuperAdminGuard)
export class AdminCompaniesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async listAllCompanies() {
    return this.prisma.company.findMany({
      include: {
        _count: {
          select: { users: true, sales: true }
        }
      },
      orderBy: { id: 'desc' }
    });
  }

  @Patch(':id/status')
  async toggleCompanyStatus(@Param('id') id: string, @Body() body: { active: boolean }) {
    // Aqui atualizaríamos o status. 
    // Como a model Company atualmente não tem o campo `active`, vou atualizar todos os usuários dessa empresa.
    // Em produção, o ideal é adicionar `active Boolean @default(true)` na model Company também.
    
    await this.prisma.user.updateMany({
      where: { companyId: id },
      data: { active: body.active }
    });

    return { message: `Status da empresa alterado para ${body.active ? 'Ativo' : 'Bloqueado'}` };
  }
}
