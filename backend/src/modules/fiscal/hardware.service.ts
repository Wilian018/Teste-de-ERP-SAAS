import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HardwareService {
  private readonly logger = new Logger(HardwareService.name);

  async readScaleWeight(port: string = 'COM3'): Promise<number> {
    this.logger.log(`[Hardware] Lendo peso da balança na porta ${port}...`);
    
    // Simula tempo de leitura da porta serial
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock do peso: 0.500kg (500g)
    const mockWeight = 0.500;
    this.logger.log(`[Hardware] Peso lido: ${mockWeight}kg`);
    return mockWeight;
  }

  async printThermalReceipt(content: string, printerName: string = 'EPSON_TM_T20') {
    this.logger.log(`[Hardware] Enviando impressão para: ${printerName}`);
    // Na vida real, usaríamos bibliotecas como 'node-escpos' ou 'printer'
    this.logger.log(`[Hardware] Conteúdo Impresso:\n${content}`);
    return { success: true, printedAt: new Date() };
  }
}
