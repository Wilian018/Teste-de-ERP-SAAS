import { PrismaService } from '../../prisma/prisma.service';
import { EventsGateway } from '../../events/events.gateway';
export declare class SalesService {
    private prisma;
    private eventsGateway;
    constructor(prisma: PrismaService, eventsGateway: EventsGateway);
    create(companyId: string, data: any): Promise<{
        id: string;
        companyId: string;
        createdAt: Date;
        customerId: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        status: string;
    }>;
    findAll(companyId: string): Promise<({
        items: ({
            product: {
                id: string;
                name: string;
                companyId: string;
                barcode: string | null;
                sku: string | null;
                costPrice: import("@prisma/client/runtime/library").Decimal;
                salePrice: import("@prisma/client/runtime/library").Decimal;
                stockQty: number;
                ncm: string | null;
                cfop: string | null;
                cst: string | null;
                csosn: string | null;
                icmsRate: import("@prisma/client/runtime/library").Decimal | null;
                brand: string | null;
                imageUrl: string | null;
            };
        } & {
            id: string;
            saleId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
        })[];
        financials: {
            id: string;
            companyId: string;
            status: string;
            saleId: string | null;
            costCenterId: string | null;
            type: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            dueDate: Date;
        }[];
    } & {
        id: string;
        companyId: string;
        createdAt: Date;
        customerId: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        status: string;
    })[]>;
}
