import { PrismaService } from '../../prisma/prisma.service';
export declare class SuppliersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(companyId: string, data: any): Promise<{
        id: string;
        cnpj: string;
        name: string;
        companyId: string;
        email: string | null;
        phone: string | null;
    }>;
    findAll(companyId: string): Promise<{
        id: string;
        cnpj: string;
        name: string;
        companyId: string;
        email: string | null;
        phone: string | null;
    }[]>;
    findOne(companyId: string, id: string): Promise<{
        id: string;
        cnpj: string;
        name: string;
        companyId: string;
        email: string | null;
        phone: string | null;
    } | null>;
    update(companyId: string, id: string, data: any): Promise<{
        id: string;
        cnpj: string;
        name: string;
        companyId: string;
        email: string | null;
        phone: string | null;
    }>;
    remove(companyId: string, id: string): Promise<{
        id: string;
        cnpj: string;
        name: string;
        companyId: string;
        email: string | null;
        phone: string | null;
    }>;
}
