"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationsService = void 0;
const common_1 = require("@nestjs/common");
let IntegrationsService = class IntegrationsService {
    async generatePixPayment(amount, description) {
        console.log(`[MercadoPago API] Gerando PIX Dinâmico: R$ ${amount} - ${description}`);
        return {
            success: true,
            qr_code: "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426655440000520400005303986540510.005802BR5913MercadoPDV SA6009Sao Paulo62070503***6304E1E1",
            qr_code_base64: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
            external_reference: `PIX-${Date.now()}`,
        };
    }
    async sendWhatsAppReceipt(phone, receiptUrl, total) {
        console.log(`[WhatsApp API] Enviando comprovante para ${phone} - Valor: R$ ${total}`);
        console.log(`[WhatsApp API] Link: ${receiptUrl}`);
        return {
            success: true,
            messageId: `MSG-${Date.now()}`,
            status: "SENT"
        };
    }
};
exports.IntegrationsService = IntegrationsService;
exports.IntegrationsService = IntegrationsService = __decorate([
    (0, common_1.Injectable)()
], IntegrationsService);
//# sourceMappingURL=integrations.service.js.map