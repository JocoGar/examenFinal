const express = require('express');
const router = express.Router();
const sneakerController = require('../controllers/sneaker.controller.js');
const juegoController = require('../controllers/juego.controller.js');

//para sneakers, prueba
router.post('/api/sneakers/create', sneakerController.create);
router.get('/api/sneakers/all', sneakerController.retrieveAllSneakers);
router.get('/api/sneakers/onebyid/:id', sneakerController.getSneakerById);
router.put('/api/sneakers/update/:id', sneakerController.updateById);
router.delete('/api/sneakers/delete/:id', sneakerController.deleteById);

// Rutas para juegos
router.post('/api/juegos/create', juegoController.create);
router.get('/api/juegos/all', juegoController.retrieveAllJuegos);
router.get('/api/juegos/onebyid/:id', juegoController.getJuegoById);
router.put('/api/juegos/update/:id', juegoController.updateById);
router.delete('/api/juegos/delete/:id', juegoController.deleteById);

module.exports = router;
