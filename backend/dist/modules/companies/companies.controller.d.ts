import { CompaniesService } from './companies.service';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
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
