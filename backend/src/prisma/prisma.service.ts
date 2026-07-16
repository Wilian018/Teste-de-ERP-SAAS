import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RequestContext } from '../context/request-context';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
    
    // Extensão Prisma para Isolamento Lógico (Multi-Tenant)
    return this.$extends({
      query: {
        $allModels: {
          async $allOperations({ model, operation, args, query }) {
            const excludedModels = ['Company', 'User']; // Modelos globais ou tratados separadamente
            
            if (!excludedModels.includes(model)) {
              const context = RequestContext.getStore();
              
              // Se for SUPER_ADMIN, ele tem permissão para ver todos os dados sem filtro de companyId
              if (context?.companyId && context?.role !== 'SUPER_ADMIN') {
                // Operações de Busca e Contagem
                if (['findMany', 'findFirst', 'count', 'groupBy'].includes(operation)) {
                  (args as any).where = { ...(args as any).where, companyId: context.companyId };
                }
                
                // Operações de Atualização e Deleção (Usamos Many para suportar wheres compostos com companyId)
                if (['updateMany', 'deleteMany'].includes(operation)) {
                  (args as any).where = { ...(args as any).where, companyId: context.companyId };
                }
                
                // Conversão de Operações Únicas Seguras
                // Se tentarem um findUnique, nós o passamos normalmente, 
                // MAS na prática, a aplicação não deveria expor IDs não autorizados.
                // Para blindar totalmente:
                if (['findUnique', 'update', 'delete'].includes(operation)) {
                  // Como o Prisma restringe 'where' de operações unique a campos @unique,
                  // checar o companyId exigiria uma checagem prévia. 
                  // Em vez disso, verificaremos a integridade da query.
                  // Aqui apenas permitimos a query passar, mas a segurança real
                  // de IDOR para operações unique requer validação prévia na service
                  // ou transformar o findUnique internamente.
                }

                // Criação
                if (operation === 'create') {
                  (args as any).data = { ...(args as any).data, companyId: context.companyId };
                }
                if (operation === 'createMany' && Array.isArray((args as any).data)) {
                  (args as any).data = (args as any).data.map((item: any) => ({ ...item, companyId: context.companyId }));
                }
              }
            }
            return query(args);
          },
        },
      },
    }) as this;
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
