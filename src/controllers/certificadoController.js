const service = require('../services/certificadoService');

module.exports = {

  emitir(req, res, next) {
    try {
      const data = service.emitir(req.params.id, req.body);
      res.status(201).json(data);
    } catch (err) { next(err); }
  },

  listar(req, res, next) {
    try {
      res.json(service.listarPorUsuario(req.params.id));
    } catch (err) { next(err); }
  },

  buscar(req, res, next) {
    try {
      res.json(service.buscarPorId(req.params.id));
    } catch (err) { next(err); }
  },

  remover(req, res, next) {
    try {
      service.remover(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  },

  verificar(req, res, next) {
    try {
      res.json(service.verificar(req.params.id));
    } catch (err) { next(err); }
  }
};