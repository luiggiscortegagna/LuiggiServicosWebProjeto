const service = require('../services/usuarioService');

module.exports = {

  criar(req, res, next) {
    try {
      const data = service.criar(req.body);
      res.status(201).json(data);
    } catch (err) { next(err); }
  },

  listar(req, res, next) {
    try {
      res.json(service.listar());
    } catch (err) { next(err); }
  },

  buscar(req, res, next) {
    try {
      res.json(service.buscarPorId(req.params.id));
    } catch (err) { next(err); }
  },

  atualizar(req, res, next) {
    try {
      res.json(service.atualizar(req.params.id, req.body));
    } catch (err) { next(err); }
  },

  remover(req, res, next) {
    try {
      service.remover(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  }
};