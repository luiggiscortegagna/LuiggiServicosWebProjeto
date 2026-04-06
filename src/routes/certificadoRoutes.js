const express = require('express');
const controller = require('../controllers/certificadoController');

const router = express.Router();

router.post('/usuarios/:id/certificados', controller.emitir);
router.get('/usuarios/:id/certificados', controller.listar);

router.get('/certificados/:id', controller.buscar);
router.delete('/certificados/:id', controller.remover);
router.post('/certificados/:id/verificar', controller.verificar);

module.exports = router;