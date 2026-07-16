import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RequestContext } from '../context/request-context';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const reqContext = RequestContext.getStore();
    
    if (reqContext?.role === 'SUPER_ADMIN') {
      return true;
    }
    
    throw new ForbiddenException('Acesso negado. Apenas o Dono da Plataforma (SUPER_ADMIN) pode executar esta ação.');
  }
}
