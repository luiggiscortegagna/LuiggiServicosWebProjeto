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

  async emitir(usuarioId, dados) {
    const user = await userRepo.buscarPorId(Number(usuarioId));
    if (!user) throw new AppError("Usuário não encontrado", 404);

    if (!dados.idadeMinima) {
      throw new AppError("Dados inválidos", 400);
    }

    const agora = new Date();
    const expira = new Date();
    expira.setDate(agora.getDate() + 30);

    return await certRepo.criar({
      usuarioId: Number(usuarioId),
      idadeMinima: dados.idadeMinima,
      emitidoEm: agora,
      expiraEm: expira
    });
  },

  async listarPorUsuario(usuarioId) {
    const user = await userRepo.buscarPorId(Number(usuarioId));
    if (!user) throw new AppError("Usuário não encontrado", 404);

    return await certRepo.listarPorUsuario(Number(usuarioId));
  },

  async buscarPorId(id) {
    const cert = await certRepo.buscarPorId(Number(id));
    if (!cert) throw new AppError("Certificado não encontrado", 404);
    return cert;
  },

  async remover(id) {
    const ok = await certRepo.remover(Number(id));
    if (!ok) throw new AppError("Certificado não encontrado", 404);
  },

  async verificar(id) {
    const cert = await certRepo.buscarPorId(Number(id));
    if (!cert) throw new AppError("Certificado não encontrado", 404);

    const user = await userRepo.buscarPorId(cert.usuarioId);
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