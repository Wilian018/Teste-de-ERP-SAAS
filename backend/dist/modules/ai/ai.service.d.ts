import { PrismaService } from '../../prisma/prisma.service';
export declare class AiService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    predictStockDepletion(companyId: string): Promise<{
        productId: string;
        productName: string;
        currentStock: number;
        estimatedDailySales: number;
        daysUntilEmpty: number;
        riskLevel: string;
    }[]>;
}
