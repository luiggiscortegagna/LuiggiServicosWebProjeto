const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const AppError = require('./AppError');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não fornecido", 401);
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    throw new AppError("Token inválido", 401);
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    throw new AppError("Token mal formatado", 401);
  }

  try {
    const decoded = jwt.verify(token, config.segredo);
    req.usuario = decoded;
    return next();
  } catch (err) {
    throw new AppError("Token inválido", 401);
  }
};