import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(companyId: string, authorId: string, data: any) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          ...data,
          companyId,
        },
      });

      await tx.auditLog.create({
        data: {
          companyId,
          userId: authorId,
          action: 'CREATE_USER',
          entity: 'User',
          entityId: user.id,
          details: `Criou usuário ${user.name} com role ${user.role}`
        }
      });

      return user;
    });
  }

  async findAll(companyId: string) {
    return this.prisma.user.findMany({
      where: { companyId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
      }
    });
  }

  async update(companyId: string, authorId: string, id: string, data: any) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id, companyId },
        data,
      });

      await tx.auditLog.create({
        data: {
          companyId,
          userId: authorId,
          action: 'UPDATE_USER',
          entity: 'User',
          entityId: user.id,
          details: `Atualizou usuário ${user.name}`
        }
      });

      return user;
    });
  }
}
