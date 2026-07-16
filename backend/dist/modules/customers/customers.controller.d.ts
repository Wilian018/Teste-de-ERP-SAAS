import { CustomersService } from './customers.service';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    private getCompanyId;
    create(data: any): Promise<{
        id: string;
        name: string;
        companyId: string;
        cpfCnpj: string;
        creditLimit: import("@prisma/client/runtime/library").Decimal;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        companyId: string;
        cpfCnpj: string;
        creditLimit: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        companyId: string;
        cpfCnpj: string;
        creditLimit: import("@prisma/client/runtime/library").Decimal;
    } | null>;
    update(id: string, data: any): Promise<{
        id: string;
        name: string;
        companyId: string;
        cpfCnpj: string;
        creditLimit: import("@prisma/client/runtime/library").Decimal;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        companyId: string;
        cpfCnpj: string;
        creditLimit: import("@prisma/client/runtime/library").Decimal;
    }>;
}
