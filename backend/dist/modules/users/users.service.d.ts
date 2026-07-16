import { PrismaService } from '../../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(companyId: string, authorId: string, data: any): Promise<{
        id: string;
        name: string;
        companyId: string;
        email: string;
        password: string;
        role: string;
        active: boolean;
        createdAt: Date;
    }>;
    findAll(companyId: string): Promise<{
        id: string;
        name: string;
        email: string;
        role: string;
        active: boolean;
        createdAt: Date;
    }[]>;
    update(companyId: string, authorId: string, id: string, data: any): Promise<{
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
