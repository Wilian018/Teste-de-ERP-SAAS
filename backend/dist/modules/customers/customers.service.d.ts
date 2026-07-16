import { PrismaService } from '../../prisma/prisma.service';
export declare class CustomersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(companyId: string, data: any): Promise<{
        id: string;
        name: string;
        companyId: string;
        cpfCnpj: string;
        creditLimit: import("@prisma/client/runtime/library").Decimal;
    }>;
    findAll(companyId: string): Promise<{
        id: string;
        name: string;
        companyId: string;
        cpfCnpj: string;
        creditLimit: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    findOne(companyId: string, id: string): Promise<{
        id: string;
        name: string;
        companyId: string;
        cpfCnpj: string;
        creditLimit: import("@prisma/client/runtime/library").Decimal;
    } | null>;
    update(companyId: string, id: string, data: any): Promise<{
        id: string;
        name: string;
        companyId: string;
        cpfCnpj: string;
        creditLimit: import("@prisma/client/runtime/library").Decimal;
    }>;
    remove(companyId: string, id: string): Promise<{
        id: string;
        name: string;
        companyId: string;
        cpfCnpj: string;
        creditLimit: import("@prisma/client/runtime/library").Decimal;
    }>;
}
