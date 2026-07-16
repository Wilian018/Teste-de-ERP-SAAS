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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PurchasesService = class PurchasesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(companyId, data) {
        const { supplierId, totalAmount, items } = data;
        if (!items || items.length === 0) {
            throw new common_1.BadRequestException('A compra deve conter itens.');
        }
        return this.prisma.$transaction(async (tx) => {
            const purchase = await tx.purchaseOrder.create({
                data: {
                    companyId,
                    supplierId,
                    totalAmount,
                    status: 'RECEIVED',
                },
            });
            for (const item of items) {
                await tx.purchaseItem.create({
                    data: {
                        purchaseOrderId: purchase.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        unitCost: item.unitCost,
                    },
                });
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stockQty: { increment: item.quantity },
                        costPrice: item.unitCost
                    },
                });
            }
            await tx.financialTransaction.create({
                data: {
                    companyId,
                    type: 'EXPENSE',
                    amount: totalAmount,
                    status: 'PAID',
                    dueDate: new Date(),
                },
            });
            return purchase;
        });
    }
    async findAll(companyId) {
        return this.prisma.purchaseOrder.findMany({
            where: { companyId },
            include: {
                supplier: true,
                items: { include: { product: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
};
exports.PurchasesService = PurchasesService;
exports.PurchasesService = PurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PurchasesService);
//# sourceMappingURL=purchases.service.js.map