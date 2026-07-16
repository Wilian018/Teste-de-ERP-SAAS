import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    private getCompanyId;
    private getAuthorId;
    create(data: any): Promise<{
        id: string;
        name: string;
        companyId: string;
        email: string;
        password: string;
        role: string;
        active: boolean;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        email: string;
        role: string;
        active: boolean;
        createdAt: Date;
    }[]>;
    update(id: string, data: any): Promise<{
        id: string;
        name: string;
        companyId: string;
        email: string;
        password: string;
        role: string;
        active: boolean;
        createdAt: Date;
    }>;
}
