import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    private getCompanyId;
    create(data: any): Promise<{
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
    findAll(): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
