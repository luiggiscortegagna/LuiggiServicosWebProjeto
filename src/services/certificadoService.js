const certRepo = require('../repositories/certificadoRepository');
const userRepo = require('../repositories/usuarioRepository');
const AppError = require('../middlewares/AppError');

// outra cortesia do gpt... tinha esquecido de arrumar o atendeRequisito
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

  emitir(usuarioId, dados) {
    const user = userRepo.buscarPorId(Number(usuarioId));
    if (!user) throw new AppError("Usuário não encontrado", 404);

    if (!dados.idadeMinima) {
      throw new AppError("Dados inválidos", 400);
    }

    const agora = new Date();
    const expira = new Date();
    expira.setDate(agora.getDate() + 30);

    return certRepo.criar({
      usuarioId: Number(usuarioId),
      idadeMinima: dados.idadeMinima,
      emitidoEm: agora,
      expiraEm: expira
    });
  },

  listarPorUsuario(usuarioId) {
    const user = userRepo.buscarPorId(Number(usuarioId));
    if (!user) throw new AppError("Usuário não encontrado", 404);

    return certRepo.listarPorUsuario(Number(usuarioId));
  },

  buscarPorId(id) {
    const cert = certRepo.buscarPorId(Number(id));
    if (!cert) throw new AppError("Certificado não encontrado", 404);
    return cert;
  },

  remover(id) {
    const ok = certRepo.remover(Number(id));
    if (!ok) throw new AppError("Certificado não encontrado", 404);
  },

  verificar(id) {
    const cert = certRepo.buscarPorId(Number(id));
    if (!cert) throw new AppError("Certificado não encontrado", 404);

    const user = userRepo.buscarPorId(cert.usuarioId);
    if (!user) throw new AppError("Usuário não encontrado", 404);

    const valido = new Date() < new Date(cert.expiraEm);

    const idade = calcularIdade(user.dataNascimento);

    const atendeRequisito = idade >= cert.idadeMinima;

    return {
      valido,
      atendeRequisito
    };
  }
};