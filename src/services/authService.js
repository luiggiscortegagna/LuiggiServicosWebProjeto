const jwt = require('jsonwebtoken');
const repo = require('../repositories/usuarioRepository');
const config = require('../config/jwt');
const AppError = require('../middlewares/AppError');

module.exports = {

  async login(email) {

    const user = await repo.buscarPorEmail(email);

    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.segredo,
      { expiresIn: config.expiracao }
    );

    return { token };
  }
};