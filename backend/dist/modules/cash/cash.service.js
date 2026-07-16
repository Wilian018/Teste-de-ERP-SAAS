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
exports.CashService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CashService = class CashService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async openSession(companyId, userId, registerId, openingBalance) {
        return this.prisma.$transaction(async (tx) => {
            const register = await tx.cashRegister.findUnique({ where: { id: registerId, companyId } });
            if (register?.status === 'OPEN')
                throw new common_1.BadRequestException('Caixa já está aberto.');
            const session = await tx.cashRegisterSession.create({
                data: {
                    companyId,
                    cashRegisterId: registerId,
                    userId,
                    openingBalance,
                    status: 'OPEN',
                }
            });
            await tx.cashRegister.update({
                where: { id: registerId },
                data: { status: 'OPEN' }
            });
            if (openingBalance > 0) {
                await tx.cashMovement.create({
                    data: {
                        sessionId: session.id,
                        type: 'SUPRIMENTO',
                        amount: openingBalance,
                        description: 'Fundo de Troco Inicial'
                    }
                });
            }
            return session;
        });
    }
    async registerMovement(sessionId, type, amount, description) {
        const session = await this.prisma.cashRegisterSession.findUnique({ where: { id: sessionId } });
        if (!session || session.status === 'CLOSED') {
            throw new common_1.BadRequestException('Sessão de caixa não encontrada ou já encerrada.');
        }
        return this.prisma.cashMovement.create({
            data: {
                sessionId,
                type,
                amount,
                description
            }
        });
    }
    async closeSession(sessionId, closingBalance) {
        return this.prisma.$transaction(async (tx) => {
            const session = await tx.cashRegisterSession.findUnique({ where: { id: sessionId } });
            if (!session || session.status === 'CLOSED') {
                throw new common_1.BadRequestException('Sessão de caixa não encontrada ou já encerrada.');
            }
            const updatedSession = await tx.cashRegisterSession.update({
                where: { id: sessionId },
                data: {
                    status: 'CLOSED',
                    closedAt: new Date(),
                    closingBalance,
                }
            });
            await tx.cashRegister.update({
                where: { id: session.cashRegisterId },
                data: { status: 'CLOSED' }
            });
            return updatedSession;
        });
    }
};
exports.CashService = CashService;
exports.CashService = CashService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CashService);
//# sourceMappingURL=cash.service.js.map