const service = require('../services/certificadoService');

module.exports = {

  async emitir(req, res, next) {
    try {
      const data = await service.emitir(req.params.id, req.body);
      res.status(201).json(data);
    } catch (err) { next(err); }
  },

  async listar(req, res, next) {
    try {
      res.json(await service.listarPorUsuario(req.params.id));
    } catch (err) { next(err); }
  },

  async buscar(req, res, next) {
    try {
      res.json(await service.buscarPorId(req.params.id));
    } catch (err) { next(err); }
  },

  async remover(req, res, next) {
    try {
      await service.remover(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  },

  async verificar(req, res, next) {
    try {
      res.json(await service.verificar(req.params.id));
    } catch (err) { next(err); }
  }
};