import { PrismaService } from '../../prisma/prisma.service';
export declare class FiscalService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    emitNFCe(companyId: string, saleId: string): Promise<{
        number: string | null;
        id: string;
        companyId: string;
        status: string;
        saleId: string;
        series: string | null;
        accessKey: string | null;
        xmlBase64: string | null;
        environment: string;
        issuedAt: Date;
    }>;
}
