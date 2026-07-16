import { Controller, Post, Body, Get } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  private getCompanyId() {
    return 'default-company-id'; // Simulando o ID da empresa do token JWT
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
