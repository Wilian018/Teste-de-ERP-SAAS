import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerTenant(data: any): Promise<{
        message: string;
        company: {
            id: string;
            name: string;
        };
        user: {
            id: string;
            name: string;
            email: string;
        };
        access_token: string;
    }>;
    login(email: string, pass: string): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
        };
    }>;
}
