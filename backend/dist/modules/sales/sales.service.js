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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const events_gateway_1 = require("../../events/events.gateway");
let SalesService = class SalesService {
    prisma;
    eventsGateway;
    constructor(prisma, eventsGateway) {
        this.prisma = prisma;
        this.eventsGateway = eventsGateway;
    }
    async create(companyId, data) {
        return this.prisma.$transaction(async (tx) => {
            let totalAmount = 0;
            let totalCost = 0;
            const saleItemsData = [];
            let cashbackPoints = 0;
            for (const item of data.items) {
                const product = await tx.product.findUnique({
                    where: { id: item.productId },
                    include: { promotions: { where: { active: true } } }
                });
                if (!product || product.companyId !== companyId) {
                    throw new common_1.BadRequestException(`Produto ${item.productId} não encontrado`);
                }
                if (product.stockQty < item.quantity) {
                    throw new common_1.BadRequestException(`Estoque insuficiente para o produto ${product.name}`);
                }
                let finalPrice = Number(product.salePrice);
                if (product.promotions.length > 0) {
                    const promo = product.promotions[0];
                    if (promo.type === 'QUANTITY_DISCOUNT' && promo.minQuantity && item.quantity >= promo.minQuantity) {
                        finalPrice = finalPrice - (finalPrice * (Number(promo.discount) / 100));
                    }
                }
                const itemTotal = finalPrice * item.quantity;
                const itemCostTotal = Number(product.costPrice) * item.quantity;
                totalAmount += itemTotal;
                totalCost += itemCostTotal;
                saleItemsData.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: finalPrice,
                    total: itemTotal,
                });
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stockQty: { decrement: item.quantity } }
                });
            }
            const sale = await tx.sale.create({
                data: {
                    companyId,
                    totalAmount,
                    status: 'COMPLETED',
                    customerId: data.customerId,
                    items: {
                        create: saleItemsData
                    }
                }
            });
            await tx.financialTransaction.create({
                data: {
                    companyId,
                    saleId: sale.id,
                    type: 'INCOME',
                    amount: totalAmount,
                    status: 'PAID',
                    dueDate: new Date()
                }
            });
            if (data.customerId) {
                cashbackPoints = Math.floor(totalAmount / 10);
                await tx.customerPoints.upsert({
                    where: { customerId: data.customerId },
                    create: { customerId: data.customerId, balance: cashbackPoints },
                    update: { balance: { increment: cashbackPoints } }
                });
            }
            this.eventsGateway.emitNewSale({
                saleId: sale.id,
                totalAmount,
                itemsCount: data.items.length,
            });
            return sale;
        });
    }
    async findAll(companyId) {
        return this.prisma.sale.findMany({
            where: { companyId },
            include: {
                items: { include: { product: true } },
                financials: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        events_gateway_1.EventsGateway])
], SalesService);
//# sourceMappingURL=sales.service.js.map