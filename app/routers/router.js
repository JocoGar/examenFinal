const express = require('express');
const router = express.Router();
const sneakerController = require('../controllers/sneaker.controller.js');

//para sneakers, prueba
router.post('/api/sneakers/create', sneakerController.create);
router.get('/api/sneakers/all', sneakerController.retrieveAllSneakers);
router.get('/api/sneakers/onebyid/:id', sneakerController.getSneakerById);
router.put('/api/sneakers/update/:id', sneakerController.updateById);
router.delete('/api/sneakers/delete/:id', sneakerController.deleteById);

module.exports = router;
