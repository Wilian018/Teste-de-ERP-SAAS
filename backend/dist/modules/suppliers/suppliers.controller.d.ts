import { SuppliersService } from './suppliers.service';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    private getCompanyId;
    create(data: any): Promise<{
        id: string;
        cnpj: string;
        name: string;
        companyId: string;
        email: string | null;
        phone: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        cnpj: string;
        name: string;
        companyId: string;
        email: string | null;
        phone: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        cnpj: string;
        name: string;
        companyId: string;
        email: string | null;
        phone: string | null;
    } | null>;
    update(id: string, data: any): Promise<{
        id: string;
        cnpj: string;
        name: string;
        companyId: string;
        email: string | null;
        phone: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        cnpj: string;
        name: string;
        companyId: string;
        email: string | null;
        phone: string | null;
    }>;
}
