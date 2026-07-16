import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerTenant(body: any): Promise<{
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
    login(body: any): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
        };
    }>;
}
