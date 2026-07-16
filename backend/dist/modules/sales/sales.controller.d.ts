import { SalesService } from './sales.service';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    private getCompanyId;
    checkout(payload: any): Promise<{
        id: string;
        companyId: string;
        createdAt: Date;
        customerId: string | null;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        status: string;
    }>;
    findAll(): Promise<({
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
