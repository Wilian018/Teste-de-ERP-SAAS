import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationsService {
  
  async generatePixPayment(amount: number, description: string) {
    // Simulando a chamada à API do Mercado Pago
    console.log(`[MercadoPago API] Gerando PIX Dinâmico: R$ ${amount} - ${description}`);
    
    // Payload mockado de resposta do Mercado Pago
    return {
      success: true,
      qr_code: "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426655440000520400005303986540510.005802BR5913MercadoPDV SA6009Sao Paulo62070503***6304E1E1",
      qr_code_base64: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", // Fake image base64
      external_reference: `PIX-${Date.now()}`,
    };
  }

  async sendWhatsAppReceipt(phone: string, receiptUrl: string, total: number) {
    // Simulando a chamada à API do WhatsApp (ex: Baileys, Z-API)
    console.log(`[WhatsApp API] Enviando comprovante para ${phone} - Valor: R$ ${total}`);
    console.log(`[WhatsApp API] Link: ${receiptUrl}`);
    
    return {
      success: true,
      messageId: `MSG-${Date.now()}`,
      status: "SENT"
    };
  }
}
