import { PrismaService } from '../../prisma/prisma.service';
export declare class CompaniesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        cnpj: string;
        name: string;
    }>;
    findAll(): Promise<{
        id: string;
        cnpj: string;
        name: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        cnpj: string;
        name: string;
    } | null>;
    update(id: string, data: any): Promise<{
        id: string;
        cnpj: string;
        name: string;
    }>;
}
