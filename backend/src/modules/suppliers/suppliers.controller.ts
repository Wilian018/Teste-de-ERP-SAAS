import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { RequestContext } from '../../context/request-context';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  private getCompanyId() {
    const context = RequestContext.getStore();
    if (!context || !context.companyId) {
      throw new UnauthorizedException('Empresa não identificada no contexto da requisição');
    }
    return context.companyId;
  }

  @Post()
  create(@Body() data: any) {
    return this.suppliersService.create(this.getCompanyId(), data);
  }

  @Get()
  findAll() {
    return this.suppliersService.findAll(this.getCompanyId());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(this.getCompanyId(), id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.suppliersService.update(this.getCompanyId(), id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(this.getCompanyId(), id);
  }
}
