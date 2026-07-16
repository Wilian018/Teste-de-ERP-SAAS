import { Controller, Get } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('predictions/stock')
  getPredictions() {
    return this.aiService.predictStockDepletion('default-company-id');
  }
}
