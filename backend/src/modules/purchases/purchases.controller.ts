import { Controller, Post, Body, Get } from '@nestjs/common';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  private getCompanyId() {
    return 'default-company-id'; // Simulação de JWT
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
