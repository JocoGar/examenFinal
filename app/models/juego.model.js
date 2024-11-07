module.exports = (sequelize, Sequelize) => {

    const Juego = sequelize.define("juego", {
        id_juego: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        genero: {
            type: Sequelize.STRING
        },
        plataforma: {
            type: Sequelize.STRING
        },
        
        lanzamiento: {
            type: Sequelize.DATE
        },
        precio_alquiler: {  
            type: Sequelize.FLOAT
        },
        disponibilidad:{
            type: Sequelize.INTEGER,
        },
        fecha_alquiler:{
            type: Sequelize.DATE
        },
        fecha_devolucion:{
            type: Sequelize.DATE
        },
        nombre_cliente:{
            type: Sequelize.STRING
        },
        comentarios:{
            type: Sequelize.STRING
        }
     }, {
         tableName: 'juegos'

    });
    return Juego;
};