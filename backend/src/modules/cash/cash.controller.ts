import { Controller, Post, Body, Param } from '@nestjs/common';
import { CashService } from './cash.service';

@Controller('cash')
export class CashController {
  constructor(private readonly cashService: CashService) {}

  private getCompanyId() { return 'default-company-id'; }
  private getUserId() { return 'admin-user-id'; }

  @Post('open/:registerId')
  openSession(
    @Param('registerId') registerId: string,
    @Body('openingBalance') openingBalance: number
  ) {
    return this.cashService.openSession(this.getCompanyId(), this.getUserId(), registerId, openingBalance);
  }

  @Post('movement/:sessionId')
  registerMovement(
    @Param('sessionId') sessionId: string,
    @Body() data: { type: 'SANGRIA' | 'SUPRIMENTO', amount: number, description: string }
  ) {
    return this.cashService.registerMovement(sessionId, data.type, data.amount, data.description);
  }

  @Post('close/:sessionId')
  closeSession(
    @Param('sessionId') sessionId: string,
    @Body('closingBalance') closingBalance: number
  ) {
    return this.cashService.closeSession(sessionId, closingBalance);
  }
}
