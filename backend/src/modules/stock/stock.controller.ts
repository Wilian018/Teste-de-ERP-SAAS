import { Controller, Get, Post, Body, UnauthorizedException } from '@nestjs/common';
import { StockService } from './stock.service';
import { RequestContext } from '../../context/request-context';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  private getCompanyId() {
    const context = RequestContext.getStore();
    if (!context || !context.companyId) {
      throw new UnauthorizedException('Empresa não identificada no contexto da requisição');
    }
    return context.companyId;
  }

  @Post('move')
  move(@Body() data: any) {
    return this.stockService.move(this.getCompanyId(), data);
  }

  @Get()
  findAll() {
    return this.stockService.findAll(this.getCompanyId());
  }
}
