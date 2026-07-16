"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HardwareService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwareService = void 0;
const common_1 = require("@nestjs/common");
let HardwareService = HardwareService_1 = class HardwareService {
    logger = new common_1.Logger(HardwareService_1.name);
    async readScaleWeight(port = 'COM3') {
        this.logger.log(`[Hardware] Lendo peso da balança na porta ${port}...`);
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockWeight = 0.500;
        this.logger.log(`[Hardware] Peso lido: ${mockWeight}kg`);
        return mockWeight;
    }
    async printThermalReceipt(content, printerName = 'EPSON_TM_T20') {
        this.logger.log(`[Hardware] Enviando impressão para: ${printerName}`);
        this.logger.log(`[Hardware] Conteúdo Impresso:\n${content}`);
        return { success: true, printedAt: new Date() };
    }
};
exports.HardwareService = HardwareService;
exports.HardwareService = HardwareService = HardwareService_1 = __decorate([
    (0, common_1.Injectable)()
], HardwareService);
//# sourceMappingURL=hardware.service.js.map