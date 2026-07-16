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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCompaniesController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const super_admin_guard_1 = require("../../auth/super-admin.guard");
let AdminCompaniesController = class AdminCompaniesController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listAllCompanies() {
        return this.prisma.company.findMany({
            include: {
                _count: {
                    select: { users: true, sales: true }
                }
            },
            orderBy: { id: 'desc' }
        });
    }
    async toggleCompanyStatus(id, body) {
        await this.prisma.user.updateMany({
            where: { companyId: id },
            data: { active: body.active }
        });
        return { message: `Status da empresa alterado para ${body.active ? 'Ativo' : 'Bloqueado'}` };
    }
};
exports.AdminCompaniesController = AdminCompaniesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminCompaniesController.prototype, "listAllCompanies", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminCompaniesController.prototype, "toggleCompanyStatus", null);
exports.AdminCompaniesController = AdminCompaniesController = __decorate([
    (0, common_1.Controller)('api/admin/companies'),
    (0, common_1.UseGuards)(super_admin_guard_1.SuperAdminGuard),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminCompaniesController);
//# sourceMappingURL=admin-companies.controller.js.map