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
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AiService = AiService_1 = class AiService {
    prisma;
    logger = new common_1.Logger(AiService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async predictStockDepletion(companyId) {
        this.logger.log(`[AI] Rodando predição de ruptura de estoque para a empresa ${companyId}`);
        const products = await this.prisma.product.findMany({
            where: { companyId },
            select: { id: true, name: true, stockQty: true }
        });
        const predictions = products.map(p => {
            const estimatedDailySales = Math.floor(Math.random() * 10) + 1;
            const daysUntilEmpty = p.stockQty > 0 ? Math.floor(p.stockQty / estimatedDailySales) : 0;
            let riskLevel = 'LOW';
            if (daysUntilEmpty <= 3)
                riskLevel = 'CRITICAL';
            else if (daysUntilEmpty <= 7)
                riskLevel = 'WARNING';
            return {
                productId: p.id,
                productName: p.name,
                currentStock: p.stockQty,
                estimatedDailySales,
                daysUntilEmpty,
                riskLevel
            };
        });
        return predictions.sort((a, b) => a.daysUntilEmpty - b.daysUntilEmpty).slice(0, 5);
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AiService);
//# sourceMappingURL=ai.service.js.map