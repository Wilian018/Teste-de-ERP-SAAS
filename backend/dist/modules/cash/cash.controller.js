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
exports.CashController = void 0;
const common_1 = require("@nestjs/common");
const cash_service_1 = require("./cash.service");
let CashController = class CashController {
    cashService;
    constructor(cashService) {
        this.cashService = cashService;
    }
    getCompanyId() { return 'default-company-id'; }
    getUserId() { return 'admin-user-id'; }
    openSession(registerId, openingBalance) {
        return this.cashService.openSession(this.getCompanyId(), this.getUserId(), registerId, openingBalance);
    }
    registerMovement(sessionId, data) {
        return this.cashService.registerMovement(sessionId, data.type, data.amount, data.description);
    }
    closeSession(sessionId, closingBalance) {
        return this.cashService.closeSession(sessionId, closingBalance);
    }
};
exports.CashController = CashController;
__decorate([
    (0, common_1.Post)('open/:registerId'),
    __param(0, (0, common_1.Param)('registerId')),
    __param(1, (0, common_1.Body)('openingBalance')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], CashController.prototype, "openSession", null);
__decorate([
    (0, common_1.Post)('movement/:sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CashController.prototype, "registerMovement", null);
__decorate([
    (0, common_1.Post)('close/:sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Body)('closingBalance')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], CashController.prototype, "closeSession", null);
exports.CashController = CashController = __decorate([
    (0, common_1.Controller)('cash'),
    __metadata("design:paramtypes", [cash_service_1.CashService])
], CashController);
//# sourceMappingURL=cash.controller.js.map