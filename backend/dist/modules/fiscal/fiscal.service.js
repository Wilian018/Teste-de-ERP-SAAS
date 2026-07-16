"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FiscalService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiscalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let FiscalService = FiscalService_1 = class FiscalService {
    prisma;
    logger = new common_1.Logger(FiscalService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async emitNFCe(companyId, saleId) {
        this.logger.log(`Iniciando emissão de NFC-e para Venda ${saleId}...`);
        const sale = await this.prisma.sale.findUnique({
            where: { id: saleId },
            include: { items: { include: { product: true } } }
        });
        if (!sale)
            throw new Error('Venda não encontrada para emissão fiscal.');
        for (const item of sale.items) {
            if (!item.product.ncm || !item.product.cfop) {
                this.logger.warn(`Produto ${item.product.name} sem NCM ou CFOP. Emissão será em modo HOMOLOGAÇÃO/MOCK.`);
            }
        }
        const xmlMock = `<nfeProc versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><NFe><infNFe Id="NFe${Date.now()}"><emit><CNPJ>12345678000199</CNPJ></emit></infNFe></NFe></nfeProc>`;
        const xmlBase64 = Buffer.from(xmlMock).toString('base64');
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
};
exports.FiscalService = FiscalService;
exports.FiscalService = FiscalService = FiscalService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FiscalService);
//# sourceMappingURL=fiscal.service.js.map