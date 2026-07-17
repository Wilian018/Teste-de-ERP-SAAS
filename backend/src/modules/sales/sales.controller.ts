import { Controller, Post, Body, Get, UnauthorizedException } from '@nestjs/common';
import { SalesService } from './sales.service';

import { RequestContext } from '../../context/request-context';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  private getCompanyId() {
    const context = RequestContext.getStore();
    if (!context || !context.companyId) {
      throw new UnauthorizedException('Empresa não identificada no contexto da requisição');
    }
    return context.companyId;
  }

  @Post('checkout')
  checkout(@Body() payload: any) {
    return this.salesService.create(this.getCompanyId(), payload);
  }

  @Get()
  findAll() {
    return this.salesService.findAll(this.getCompanyId());
  }
}
