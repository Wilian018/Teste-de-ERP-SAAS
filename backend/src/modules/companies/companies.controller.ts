import { Controller, Get, Post, Body, Patch, Param, UnauthorizedException } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { RequestContext } from '../../context/request-context';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  private getCompanyId() {
    const context = RequestContext.getStore();
    if (!context || !context.companyId) {
      throw new UnauthorizedException('Empresa não identificada no contexto da requisição');
    }
    return context.companyId;
  }

  @Post()
  create(@Body() data: any) {
    return this.companiesService.create(data);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get('my-company')
  findMine() {
    return this.companiesService.findOne(this.getCompanyId());
  }

  @Patch('my-company')
  updateMine(@Body() data: any) {
    return this.companiesService.update(this.getCompanyId(), data);
  }
}
