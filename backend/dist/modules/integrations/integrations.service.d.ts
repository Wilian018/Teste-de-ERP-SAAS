export declare class IntegrationsService {
    generatePixPayment(amount: number, description: string): Promise<{
        success: boolean;
        qr_code: string;
        qr_code_base64: string;
        external_reference: string;
    }>;
    sendWhatsAppReceipt(phone: string, receiptUrl: string, total: number): Promise<{
        success: boolean;
        messageId: string;
        status: string;
    }>;
}
