import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  private getCompanyId() {
    return 'default-company-id'; // This will be replaced by AuthGuard later
  }

  @Post()
  create(@Body() data: any) {
    return this.customersService.create(this.getCompanyId(), data);
  }

  @Get()
  findAll() {
    return this.customersService.findAll(this.getCompanyId());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(this.getCompanyId(), id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.customersService.update(this.getCompanyId(), id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(this.getCompanyId(), id);
  }
}
