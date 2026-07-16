import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private getCompanyId() { return 'default-company-id'; }
  private getAuthorId() { return 'admin-user-id'; } // simulando o ID de quem está logado

  @Post()
  @Roles('ADMIN', 'MANAGER')
  create(@Body() data: any) {
    return this.usersService.create(this.getCompanyId(), this.getAuthorId(), data);
  }

  @Get()
  @Roles('ADMIN', 'MANAGER')
  findAll() {
    return this.usersService.findAll(this.getCompanyId());
  }

  @Patch(':id')
  @Roles('ADMIN', 'MANAGER')
  update(@Param('id') id: string, @Body() data: any) {
    return this.usersService.update(this.getCompanyId(), this.getAuthorId(), id, data);
  }
}
