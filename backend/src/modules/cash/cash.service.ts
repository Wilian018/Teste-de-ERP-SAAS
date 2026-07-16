import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CashService {
  constructor(private prisma: PrismaService) {}

  async openSession(companyId: string, userId: string, registerId: string, openingBalance: number) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Verifica se o caixa já está aberto
      const register = await tx.cashRegister.findUnique({ where: { id: registerId, companyId } });
      if (register?.status === 'OPEN') throw new BadRequestException('Caixa já está aberto.');

      // 2. Abre a sessão
      const session = await tx.cashRegisterSession.create({
        data: {
          companyId,
          cashRegisterId: registerId,
          userId,
          openingBalance,
          status: 'OPEN',
        }
      });

      // 3. Atualiza status do Caixa
      await tx.cashRegister.update({
        where: { id: registerId },
        data: { status: 'OPEN' }
      });

      // 4. Grava movimento inicial de Suprimento (Fundo de Troco)
      if (openingBalance > 0) {
        await tx.cashMovement.create({
          data: {
            sessionId: session.id,
            type: 'SUPRIMENTO',
            amount: openingBalance,
            description: 'Fundo de Troco Inicial'
          }
        });
      }

      return session;
    });
  }

  async registerMovement(sessionId: string, type: 'SANGRIA' | 'SUPRIMENTO', amount: number, description: string) {
    const session = await this.prisma.cashRegisterSession.findUnique({ where: { id: sessionId } });
    if (!session || session.status === 'CLOSED') {
      throw new BadRequestException('Sessão de caixa não encontrada ou já encerrada.');
    }

    return this.prisma.cashMovement.create({
      data: {
        sessionId,
        type,
        amount,
        description
      }
    });
  }

  async closeSession(sessionId: string, closingBalance: number) {
    return this.prisma.$transaction(async (tx) => {
      const session = await tx.cashRegisterSession.findUnique({ where: { id: sessionId } });
      if (!session || session.status === 'CLOSED') {
        throw new BadRequestException('Sessão de caixa não encontrada ou já encerrada.');
      }

      const updatedSession = await tx.cashRegisterSession.update({
        where: { id: sessionId },
        data: {
          status: 'CLOSED',
          closedAt: new Date(),
          closingBalance,
        }
      });

      await tx.cashRegister.update({
        where: { id: session.cashRegisterId },
        data: { status: 'CLOSED' }
      });

      return updatedSession;
    });
  }
}
