let usuarios = [];
let idAtual = 1;

module.exports = {

  criar(dados) {
    const usuario = { id: idAtual++, ...dados };
    usuarios.push(usuario);
    return usuario;
  },

  listar() {
    return usuarios;
  },

  buscarPorId(id) {
    return usuarios.find(u => u.id === id);
  },

  atualizar(id, dados) {
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) return null;

    usuarios[index] = { id, ...dados };
    return usuarios[index];
  },

  remover(id) {
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) return false;

    usuarios.splice(index, 1);
    return true;
  }
};