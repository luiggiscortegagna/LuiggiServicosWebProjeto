const service = require('../services/authService');
const AppError = require('../middlewares/AppError');

module.exports = {
  login: async (req, res, next) => {
    try {
      if (!req.body || !req.body.email) {
        throw new AppError("Email obrigatório", 400);
      }

      const { email } = req.body;
      const result = await service.login(email);

      res.json(result);
    } catch (err) {
      next(err);
    }
  }
};