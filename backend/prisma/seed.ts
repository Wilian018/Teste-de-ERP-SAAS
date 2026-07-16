import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando o seed do banco de dados...');

  // Verifica se o usuário master já existe
  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@erp.com' },
  });

  if (existingUser) {
    console.log('⚠️ Usuário master (admin@erp.com) já existe. Seed ignorado.');
    return;
  }

  // Cria a empresa Master
  const company = await prisma.company.create({
    data: {
      name: 'Empresa Master SaaS',
      cnpj: '00000000000000',
    },
  });

  console.log(`✅ Empresa criada: ${company.name}`);

  // Criptografa a senha master
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Cria o usuário Master
  const user = await prisma.user.create({
    data: {
      name: 'Administrador Master',
      email: 'admin@erp.com',
      password: hashedPassword,
      role: 'ADMIN',
      companyId: company.id,
    },
  });

  console.log(`✅ Usuário master criado: ${user.email} / admin123`);
  console.log('🎉 Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
