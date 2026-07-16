import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async registerTenant(data: any) {
    const { companyName, cnpj, adminName, adminEmail, adminPassword } = data;

    // 1. Verificar se CNPJ ou Email já existem
    const existingCompany = await this.prisma.company.findUnique({ where: { cnpj } });
    if (existingCompany) {
      throw new BadRequestException('CNPJ já cadastrado no sistema');
    }

    const existingUser = await this.prisma.user.findUnique({ where: { email: adminEmail } });
    if (existingUser) {
      throw new BadRequestException('Email já cadastrado');
    }

    // 2. Criptografar Senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // 3. Criar Empresa e Usuário na mesma Transação
    return this.prisma.$transaction(async (tx) => {
      // Cria a Empresa
      const company = await tx.company.create({
        data: {
          name: companyName,
          cnpj: cnpj,
        }
      });

      // Cria o Usuário Admin
      const user = await tx.user.create({
        data: {
          companyId: company.id,
          name: adminName,
          email: adminEmail,
          password: hashedPassword,
          role: 'ADMIN', // Papel raiz do dono da empresa
        }
      });

      // Gera o Token JWT
      const payload = { sub: user.id, companyId: company.id, role: user.role };
      const access_token = await this.jwtService.signAsync(payload);

      return {
        message: 'Conta criada com sucesso!',
        company: { id: company.id, name: company.name },
        user: { id: user.id, name: user.name, email: user.email },
        access_token
      };
    });
  }

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!user.active) {
      throw new UnauthorizedException('Conta inativa');
    }

    const payload = { sub: user.id, companyId: user.companyId, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}
