const prisma = require('../config/prisma');

module.exports = {

  async criar(dados) {
    return prisma.certificado.create({
      data: dados
    });
  },

  async listarPorUsuario(usuarioId) {
    return prisma.certificado.findMany({
      where: { usuarioId }
    });
  },

  async buscarPorId(id) {
    return prisma.certificado.findUnique({
      where: { id }
    });
  },

  async remover(id) {
    try {
      await prisma.certificado.delete({
        where: { id }
      });
      return true;
    } catch {
      return false;
    }
  }
};