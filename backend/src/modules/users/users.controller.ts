import { Controller, Get, Post, Body, Patch, Param, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestContext } from '../../context/request-context';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private getCompanyId() {
    const context = RequestContext.getStore();
    if (!context || !context.companyId) {
      throw new UnauthorizedException('Empresa não identificada no contexto da requisição');
    }
    return context.companyId;
  }

  private getAuthorId() { return 'admin-user-id'; } // mock admin

  @Post()
  create(@Body() data: any) {
    return this.usersService.create(this.getCompanyId(), this.getAuthorId(), data);
  }

  @Get()
  findAll() {
    return this.usersService.findAll(this.getCompanyId());
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.usersService.update(this.getCompanyId(), this.getAuthorId(), id, data);
  }
}
