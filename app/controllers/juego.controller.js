const db = require('../config/db.config.js');
const Juego = db.Juego;

exports.create = (req, res) => {
    let juego = {};

    try {
        juego.nombre = req.body.nombre;
        juego.genero = req.body.genero;
        juego.plataforma = req.body.plataforma;
        juego.lanzamiento = req.body.lanzamiento;
        juego.precio_alquiler = req.body.precio_alquiler;
        juego.disponibilidad = req.body.disponibilidad;
        juego.fecha_alquiler = req.body.fecha_alquiler;
        juego.fecha_devolucion = req.body.fecha_devolucion;
        juego.nombre_cliente = req.body.nombre_cliente;
        juego.comentarios = req.body.comentarios;

        Juego.create(juego).then(result => {
            res.status(200).json({
                message: "Juego creado exitosamente con id = " + result.id_juego,
                juego: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el juego!",
            error: error.message
        });
    }
};

exports.retrieveAllJuegos = (req, res) => {
    Juego.findAll()
        .then(juegoInfos => {
            res.status(200).json({
                message: "¡Juegos obtenidos exitosamente!",
                juegos: juegoInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener los juegos!",
                error: error
            });
        });
};

exports.getJuegoById = (req, res) => {
    let juegoId = req.params.id;
    Juego.findByPk(juegoId)
        .then(juego => {
            res.status(200).json({
                message: "Juego obtenido exitosamente con id = " + juegoId,
                juego: juego
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener el juego con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let juegoId = req.params.id;
        let juego = await Juego.findByPk(juegoId);

        if (!juego) {
            res.status(404).json({
                message: "No se encontró el juego para actualizar con id = " + juegoId,
                juego: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                genero: req.body.genero,
                plataforma: req.body.plataforma,
                lanzamiento: req.body.lanzamiento,
                precio_alquiler: req.body.precio_alquiler,
                disponibilidad: req.body.disponibilidad,
                fecha_alquiler: req.body.fecha_alquiler,
                fecha_devolucion: req.body.fecha_devolucion,
                nombre_cliente: req.body.nombre_cliente,
                comentarios: req.body.comentarios
            };

            let result = await Juego.update(updatedObject, { returning: true, where: { id_juego: juegoId } });

            res.status(200).json({
                message: "Actualización exitosa de un juego con id = " + juegoId,
                juego: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el juego con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let juegoId = req.params.id;
        let juego = await Juego.findByPk(juegoId);

        if (!juego) {
            res.status(404).json({
                message: "No existe el juego con id = " + juegoId,
                error: "404",
            });
        } else {
            await juego.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del juego con id = " + juegoId,
                juego: juego,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el juego con id = " + req.params.id,
            error: error.message,
        });
    }
};
