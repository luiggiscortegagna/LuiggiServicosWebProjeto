const prisma = require('../config/prisma');

module.exports = {
  async criar(dados) {
    return prisma.usuario.create({
      data: {
        nome: dados.nome,
        email: dados.email,
        dataNascimento: new Date(dados.dataNascimento)
      }
    });
  },

  async listar() {
    return prisma.usuario.findMany();
  },

  async buscarPorId(id) {
    return prisma.usuario.findUnique({
      where: { id }
    });
  },

  async buscarPorEmail(email) {
    return prisma.usuario.findUnique({
      where: { email }
    });
  },

  async atualizar(id, dados) {
    try {
      return await prisma.usuario.update({
        where: { id },
        data: {
          nome: dados.nome,
          email: dados.email,
          dataNascimento: new Date(dados.dataNascimento)
        }
      });
    } catch {
      return null;
    }
  },

  async remover(id) {
    try {
      await prisma.usuario.delete({
        where: { id }
      });
      return true;
    } catch {
      return false;
    }
  }
};