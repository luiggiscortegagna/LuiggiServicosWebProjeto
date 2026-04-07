const repo = require('../repositories/usuarioRepository');
const AppError = require('../middlewares/AppError');

module.exports = {
  async criar(dados) {
    if (!dados || !dados.nome || !dados.email || !dados.dataNascimento) {
      throw new AppError("Dados inválidos", 400);
    }

    if ('id' in dados) {
      throw new AppError("Dados inválidos", 400);
    }

    const existente = await repo.buscarPorEmail(dados.email);
    if (existente) {
      throw new AppError("Email já cadastrado", 409);
    }

    return await repo.criar({
      nome: dados.nome,
      email: dados.email,
      dataNascimento: dados.dataNascimento
    });
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
    if ('id' in dados) {
      throw new AppError("Dados inválidos", 400);
    }

    const atualizado = await repo.atualizar(Number(id), dados);

    if (!atualizado) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return atualizado;
  },

  async remover(id) {
    const removido = await repo.remover(Number(id));
    if (!removido) throw new AppError("Usuário não encontrado", 404);
  }
};