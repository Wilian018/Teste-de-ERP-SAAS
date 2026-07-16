import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContext } from '../context/request-context';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Permite que rotas públicas passem sem token (ex: /api/auth/login)
    if (req.path.includes('/api/auth')) {
      return RequestContext.run({}, () => next());
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'super-secret-key-for-saas',
      });

      // Inicia o contexto assíncrono para a requisição atual com dados seguros do JWT
      RequestContext.run({ companyId: payload.companyId, userId: payload.sub, role: payload.role }, () => {
        next();
      });
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
