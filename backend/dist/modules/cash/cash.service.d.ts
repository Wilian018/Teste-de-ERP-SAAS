import { PrismaService } from '../../prisma/prisma.service';
export declare class CashService {
    private prisma;
    constructor(prisma: PrismaService);
    openSession(companyId: string, userId: string, registerId: string, openingBalance: number): Promise<{
        id: string;
        companyId: string;
        status: string;
        userId: string;
        cashRegisterId: string;
        openedAt: Date;
        closedAt: Date | null;
        openingBalance: import("@prisma/client/runtime/library").Decimal;
        closingBalance: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    registerMovement(sessionId: string, type: 'SANGRIA' | 'SUPRIMENTO', amount: number, description: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        sessionId: string;
        description: string | null;
    }>;
    closeSession(sessionId: string, closingBalance: number): Promise<{
        id: string;
        companyId: string;
        status: string;
        userId: string;
        cashRegisterId: string;
        openedAt: Date;
        closedAt: Date | null;
        openingBalance: import("@prisma/client/runtime/library").Decimal;
        closingBalance: import("@prisma/client/runtime/library").Decimal | null;
    }>;
}
