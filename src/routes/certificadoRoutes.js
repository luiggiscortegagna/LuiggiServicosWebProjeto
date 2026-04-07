const express = require('express');
const controller = require('../controllers/certificadoController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

//router.post('/usuarios/:id/certificados', controller.emitir);
router.post('/usuarios/:id/certificados', auth, controller.emitir);

router.get('/usuarios/:id/certificados', controller.listar);

router.get('/certificados/:id', controller.buscar);

//router.delete('/certificados/:id', controller.remover);

router.delete('/certificados/:id', auth, controller.remover);

router.post('/certificados/:id/verificar', controller.verificar);


module.exports = router;