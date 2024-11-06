module.exports = (sequelize, Sequelize) => {

    const Sneaker = sequelize.define("sneaker", {
        id_sneaker: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        marca: {
            type: Sequelize.STRING
        },
        silueta: {
            type: Sequelize.STRING
        },
        fecha_lanzamiento: {
            type: Sequelize.DATE
        },
        
        distribuidor: {
            type: Sequelize.STRING
        },
        colorway: {  
            type: Sequelize.STRING
        }
     }, {
         tableName: 'sneakers'

    });
    return Sneaker;
};