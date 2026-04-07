const certRepo = require('../repositories/certificadoRepository');
const userRepo = require('../repositories/usuarioRepository');
const AppError = require('../middlewares/AppError');

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
}

module.exports = {
  async emitir(usuarioLogado, usuarioId, dados) {
    const usuarioIdNumero = Number(usuarioId);

    if (Number(usuarioLogado.id) !== usuarioIdNumero) {
      throw new AppError("Acesso negado", 403);
    }

    const user = await userRepo.buscarPorId(usuarioIdNumero);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (!dados || !dados.idadeMinima) {
      throw new AppError("Dados inválidos", 400);
    }

    const agora = new Date();
    const expira = new Date();
    expira.setDate(agora.getDate() + 30);

    return await certRepo.criar({
      usuarioId: usuarioIdNumero,
      idadeMinima: dados.idadeMinima,
      emitidoEm: agora,
      expiraEm: expira
    });
  },

  async listarPorUsuario(usuarioId) {
    const user = await userRepo.buscarPorId(Number(usuarioId));
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return await certRepo.listarPorUsuario(Number(usuarioId));
  },

  async buscarPorId(id) {
    const cert = await certRepo.buscarPorId(Number(id));
    if (!cert) {
      throw new AppError("Certificado não encontrado", 404);
    }

    return cert;
  },

  async remover(usuarioLogado, id) {
    const cert = await certRepo.buscarPorId(Number(id));
    if (!cert) {
      throw new AppError("Certificado não encontrado", 404);
    }

    if (Number(cert.usuarioId) !== Number(usuarioLogado.id)) {
      throw new AppError("Acesso negado", 403);
    }

    const ok = await certRepo.remover(Number(id));
    if (!ok) {
      throw new AppError("Certificado não encontrado", 404);
    }
  },

  async verificar(id) {
    const cert = await certRepo.buscarPorId(Number(id));
    if (!cert) {
      throw new AppError("Certificado não encontrado", 404);
    }

    const user = await userRepo.buscarPorId(cert.usuarioId);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const valido = new Date() < new Date(cert.expiraEm);
    const idade = calcularIdade(user.dataNascimento);
    const atendeRequisito = idade >= cert.idadeMinima;

    return {
      valido,
      atendeRequisito
    };
  }
};