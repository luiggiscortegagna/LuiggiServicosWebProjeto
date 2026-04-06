let certificados = [];
let idAtual = 1;

module.exports = {

  criar(dados) {
    const cert = { id: idAtual++, ...dados };
    certificados.push(cert);
    return cert;
  },

  listarPorUsuario(usuarioId) {
    return certificados.filter(c => c.usuarioId === usuarioId);
  },

  buscarPorId(id) {
    return certificados.find(c => c.id === id);
  },

  remover(id) {
    const index = certificados.findIndex(c => c.id === id);
    if (index === -1) return false;

    certificados.splice(index, 1);
    return true;
  }
};