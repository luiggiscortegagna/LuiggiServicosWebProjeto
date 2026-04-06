const repo = require('../repositories/usuarioRepository');
const AppError = require('../middlewares/AppError');

module.exports = {

  criar(dados) {
    if (!dados.nome || !dados.email || !dados.dataNascimento) {
      throw new AppError("Dados inválidos", 400);
    }

    return repo.criar(dados);
  },

  listar() {
    return repo.listar();
  },

  buscarPorId(id) {
    const user = repo.buscarPorId(Number(id));
    if (!user) throw new AppError("Usuário não encontrado", 404);
    return user;
  },

  atualizar(id, dados) {
    const atualizado = repo.atualizar(Number(id), dados);
    if (!atualizado) throw new AppError("Usuário não encontrado", 404);
    return atualizado;
  },

  remover(id) {
    const removido = repo.remover(Number(id));
    if (!removido) throw new AppError("Usuário não encontrado", 404);
  }
};