import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { RequestContext } from '../../context/request-context';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  private getCompanyId() {
    const context = RequestContext.currentContext;
    if (!context || !context.companyId) {
      throw new UnauthorizedException('Empresa não identificada no contexto da requisição');
    }
    return context.companyId;
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
