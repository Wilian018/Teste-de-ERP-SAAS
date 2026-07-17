import { Controller, Get, Post, Body, UnauthorizedException } from '@nestjs/common';
import { CrmService } from './crm.service';
import { RequestContext } from '../../context/request-context';

@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  private getCompanyId() {
    const context = RequestContext.getStore();
    if (!context || !context.companyId) {
      throw new UnauthorizedException('Empresa não identificada');
    }
    return context.companyId;
  }

  @Post('campaigns')
  createCampaign(@Body() data: any) {
    return this.crmService.createCampaign(this.getCompanyId(), data);
  }

  @Get('campaigns')
  getCampaigns() {
    return this.crmService.getCampaigns(this.getCompanyId());
  }
}
