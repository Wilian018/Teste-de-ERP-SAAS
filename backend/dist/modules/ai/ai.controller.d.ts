import { AiService } from './ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    getPredictions(): Promise<{
        productId: string;
        productName: string;
        currentStock: number;
        estimatedDailySales: number;
        daysUntilEmpty: number;
        riskLevel: string;
    }[]>;
}
