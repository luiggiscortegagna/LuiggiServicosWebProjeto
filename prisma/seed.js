const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.certificado.deleteMany();
  await prisma.usuario.deleteMany();

  const agora = new Date();

  const expira30 = new Date(agora);
  expira30.setDate(expira30.getDate() + 30);

  const usuario1 = await prisma.usuario.create({
    data: {
      nome: 'Luiggi Fulano',
      email: 'luiggi1@email.com',
      dataNascimento: new Date('2000-01-01T00:00:00.000Z')
    }
  });

  const usuario2 = await prisma.usuario.create({
    data: {
      nome: 'Teste Exemplo',
      email: 'teste@email.com',
      dataNascimento: new Date('2012-01-01T00:00:00.000Z')
    }
  });

  const usuario3 = await prisma.usuario.create({
    data: {
      nome: 'Carlos Legal',
      email: 'carlos3@email.com',
      dataNascimento: new Date('1998-01-01T00:00:00.000Z')
    }
  });

  await prisma.certificado.createMany({
    data: [
      {
        usuarioId: usuario1.id,
        idadeMinima: 12,
        emitidoEm: agora,
        expiraEm: expira30
      },
      {
        usuarioId: usuario1.id,
        idadeMinima: 16,
        emitidoEm: agora,
        expiraEm: expira30
      },
      {
        usuarioId: usuario1.id,
        idadeMinima: 18,
        emitidoEm: agora,
        expiraEm: expira30
      },
      {
        usuarioId: usuario2.id,
        idadeMinima: 18,
        emitidoEm: agora,
        expiraEm: expira30
      }
    ]
  });

  console.log('Seed executado com sucesso.');
  console.log({
    usuario1: usuario1.id,
    usuario2: usuario2.id,
    usuario3: usuario3.id
  });
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });