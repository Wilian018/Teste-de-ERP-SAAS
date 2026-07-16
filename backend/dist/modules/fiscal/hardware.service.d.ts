export declare class HardwareService {
    private readonly logger;
    readScaleWeight(port?: string): Promise<number>;
    printThermalReceipt(content: string, printerName?: string): Promise<{
        success: boolean;
        printedAt: Date;
    }>;
}
