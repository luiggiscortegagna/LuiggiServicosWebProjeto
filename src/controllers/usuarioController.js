const service = require('../services/usuarioService');

module.exports = {

  async criar(req, res, next) {
    try {
      const data = await service.criar(req.body);
      res.status(201).json(data);
    } catch (err) { next(err); }
  },

  async listar(req, res, next) {
    try {
      res.json(await service.listar());
    } catch (err) { next(err); }
  },

  async buscar(req, res, next) {
    try {
      res.json(await service.buscarPorId(req.params.id));
    } catch (err) { next(err); }
  },

  async atualizar(req, res, next) {
    try {
      res.json(await service.atualizar(req.params.id, req.body));
    } catch (err) { next(err); }
  },

  async remover(req, res, next) {
    try {
      await service.remover(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  }
};