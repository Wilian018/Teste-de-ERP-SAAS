import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Simulating Company extraction from JWT or headers for now
  private getCompanyId() {
    return 'default-company-id'; // This will be replaced by AuthGuard later
  }

  @Post()
  create(@Body() data: any) {
    return this.productsService.create(this.getCompanyId(), data);
  }

  @Get()
  findAll() {
    return this.productsService.findAll(this.getCompanyId());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(this.getCompanyId(), id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.productsService.update(this.getCompanyId(), id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(this.getCompanyId(), id);
  }
}
