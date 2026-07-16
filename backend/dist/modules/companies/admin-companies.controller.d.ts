import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminCompaniesController {
    private prisma;
    constructor(prisma: PrismaService);
    listAllCompanies(): Promise<({
        _count: {
            users: number;
            sales: number;
        };
    } & {
        id: string;
        cnpj: string;
        name: string;
    })[]>;
    toggleCompanyStatus(id: string, body: {
        active: boolean;
    }): Promise<{
        message: string;
    }>;
}
