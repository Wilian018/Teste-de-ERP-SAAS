import { Module } from '@nestjs/common';
import { FiscalService } from './fiscal.service';
import { HardwareService } from './hardware.service';

@Module({
  providers: [FiscalService, HardwareService],
  exports: [FiscalService, HardwareService],
})
export class FiscalModule {}
