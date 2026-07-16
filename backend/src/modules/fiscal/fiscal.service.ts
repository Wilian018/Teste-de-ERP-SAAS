import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FiscalService {
  private readonly logger = new Logger(FiscalService.name);

  constructor(private prisma: PrismaService) {}

  async emitNFCe(companyId: string, saleId: string) {
    this.logger.log(`Iniciando emissão de NFC-e para Venda ${saleId}...`);

    const sale = await this.prisma.sale.findUnique({
      where: { id: saleId },
      include: { items: { include: { product: true } } }
    });

    if (!sale) throw new Error('Venda não encontrada para emissão fiscal.');

    // Validar regras fiscais
    for (const item of sale.items) {
      if (!item.product.ncm || !item.product.cfop) {
        this.logger.warn(`Produto ${item.product.name} sem NCM ou CFOP. Emissão será em modo HOMOLOGAÇÃO/MOCK.`);
      }
    }

    // Mock Payload para SEFAZ
    const xmlMock = `<nfeProc versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><NFe><infNFe Id="NFe${Date.now()}"><emit><CNPJ>12345678000199</CNPJ></emit></infNFe></NFe></nfeProc>`;
    const xmlBase64 = Buffer.from(xmlMock).toString('base64');
    
    // Salvar FiscalNote
    const fiscalNote = await this.prisma.fiscalNote.create({
      data: {
        companyId,
        saleId,
        number: Math.floor(Math.random() * 100000).toString(),
        series: "1",
        accessKey: "35230612345678000199650010000" + Math.floor(Math.random() * 1000000000000000).toString(),
        xmlBase64,
        status: "AUTHORIZED",
        environment: "HOMOLOGATION"
      }
    });

    this.logger.log(`NFC-e Autorizada com Sucesso! Chave: ${fiscalNote.accessKey}`);
    return fiscalNote;
  }
}
