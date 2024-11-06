const db = require('../config/db.config.js');
const Sneaker = db.Sneaker;

exports.create = (req, res) => {
    let sneaker = {};

    try {
        sneaker.marca = req.body.marca;
        sneaker.silueta = req.body.silueta;
        sneaker.fecha_lanzamiento = req.body.fecha_lanzamiento;
        sneaker.distribuidor = req.body.distribuidor;
        sneaker.colorway = req.body.colorway;  // Nuevo atributo

        Sneaker.create(sneaker).then(result => {
            res.status(200).json({
                message: "Sneaker creado exitosamente con id = " + result.id_sneaker,
                sneaker: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el sneaker!",
            error: error.message
        });
    }
};

exports.retrieveAllSneakers = (req, res) => {
    Sneaker.findAll()
        .then(sneakerInfos => {
            res.status(200).json({
                message: "¡Sneakers obtenidos exitosamente!",
                sneakers: sneakerInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener los sneakers!",
                error: error
            });
        });
};

exports.getSneakerById = (req, res) => {
    let sneakerId = req.params.id;
    Sneaker.findByPk(sneakerId)
        .then(sneaker => {
            res.status(200).json({
                message: "Sneaker obtenido exitosamente con id = " + sneakerId,
                sneaker: sneaker
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener sneaker con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let sneakerId = req.params.id;
        let sneaker = await Sneaker.findByPk(sneakerId);

        if (!sneaker) {
            res.status(404).json({
                message: "No se encontró el sneaker para actualizar con id = " + sneakerId,
                sneaker: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                marca: req.body.marca,
                silueta: req.body.silueta,
                fecha_lanzamiento: req.body.fecha_lanzamiento,
                distribuidor: req.body.distribuidor,
                colorway: req.body.colorway  // Nuevo atributo
            };

            let result = await Sneaker.update(updatedObject, { returning: true, where: { id_sneaker: sneakerId } });

            res.status(200).json({
                message: "Actualización exitosa de un sneaker con id = " + sneakerId,
                sneaker: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el sneaker con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let sneakerId = req.params.id;
        let sneaker = await Sneaker.findByPk(sneakerId);

        if (!sneaker) {
            res.status(404).json({
                message: "No existe el sneaker con id = " + sneakerId,
                error: "404",
            });
        } else {
            await sneaker.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del sneaker con id = " + sneakerId,
                sneaker: sneaker,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el sneaker con id = " + req.params.id,
            error: error.message,
        });
    }
};
