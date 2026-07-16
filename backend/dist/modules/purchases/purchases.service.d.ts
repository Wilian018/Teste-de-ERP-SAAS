import { PrismaService } from '../../prisma/prisma.service';
export declare class PurchasesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(companyId: string, data: any): Promise<{
        id: string;
        companyId: string;
        createdAt: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        status: string;
        supplierId: string;
    }>;
    findAll(companyId: string): Promise<({
        supplier: {
            id: string;
            cnpj: string;
            name: string;
            companyId: string;
            email: string | null;
            phone: string | null;
        };
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
            productId: string;
            quantity: number;
            purchaseOrderId: string;
            unitCost: import("@prisma/client/runtime/library").Decimal;
        })[];
    } & {
        id: string;
        companyId: string;
        createdAt: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        status: string;
        supplierId: string;
    })[]>;
}
