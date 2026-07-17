import { Controller, Post, Body, Get, UnauthorizedException } from '@nestjs/common';
import { PurchasesService } from './purchases.service';

import { RequestContext } from '../../context/request-context';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  private getCompanyId() {
    const context = RequestContext.getStore();
    if (!context || !context.companyId) {
      throw new UnauthorizedException('Empresa não identificada no contexto da requisição');
    }
    return context.companyId;
  }

  @Post()
  create(@Body() data: any) {
    return this.purchasesService.create(this.getCompanyId(), data);
  }

  @Get()
  findAll() {
    return this.purchasesService.findAll(this.getCompanyId());
  }
}
