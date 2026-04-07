const repo = require('../repositories/usuarioRepository');
const AppError = require('../middlewares/AppError');

module.exports = {

  async criar(dados) {
    if (!dados.nome || !dados.email || !dados.dataNascimento) {
      throw new AppError("Dados inválidos", 400);
    }

    return await repo.criar(dados);
  },

  async listar() {
    return await repo.listar();
  },

  async buscarPorId(id) {
    const user = await repo.buscarPorId(Number(id));
    if (!user) throw new AppError("Usuário não encontrado", 404);
    return user;
  },

  async atualizar(id, dados) {
    const atualizado = await repo.atualizar(Number(id), dados);
    if (!atualizado) throw new AppError("Usuário não encontrado", 404);
    return atualizado;
  },

  async remover(id) {
    const removido = await repo.remover(Number(id));
    if (!removido) throw new AppError("Usuário não encontrado", 404);
  }
};