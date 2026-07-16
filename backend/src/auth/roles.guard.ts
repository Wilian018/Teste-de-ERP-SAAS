import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true; // Se a rota não exige role, passa
    }
    
    const request = context.switchToHttp().getRequest();
    // Simulating user from JWT payload extraction (Normally attached by AuthGuard)
    const user = request.user || { role: 'MANAGER' }; 

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Usuário sem permissão para acessar este recurso.');
    }
    
    return true;
  }
}
