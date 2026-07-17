import { Controller, Get, Post, Body, Patch, Param, UnauthorizedException } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { RequestContext } from '../../context/request-context';

@Controller('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  private getCompanyId() {
    const context = RequestContext.getStore();
    if (!context || !context.companyId) {
      throw new UnauthorizedException('Empresa não identificada no contexto da requisição');
    }
    return context.companyId;
  }

  @Post()
  create(@Body() data: any) {
    return this.financialService.create(this.getCompanyId(), data);
  }

  @Get()
  findAll() {
    return this.financialService.findAll(this.getCompanyId());
  }

  @Patch(':id/reconcile')
  reconcile(@Param('id') id: string) {
    return this.financialService.reconcile(this.getCompanyId(), id);
  }
}
