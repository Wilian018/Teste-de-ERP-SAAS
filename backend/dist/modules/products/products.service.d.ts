import { PrismaService } from '../../prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(companyId: string, data: any): Promise<{
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
    }>;
    findAll(companyId: string): Promise<{
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
    }[]>;
    findOne(companyId: string, id: string): Promise<{
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
    } | null>;
    update(companyId: string, id: string, data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(companyId: string, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
