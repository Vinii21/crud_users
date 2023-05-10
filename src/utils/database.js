//Gestionar la conexion a bd

// * importar sequelize
const {Sequelize} = require("sequelize");
require("dotenv").config();

// * crear una instancia de sequelize con la configuracion de conexion

const db = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    dialectOptions: { ssl: {require: true, rejectUnauthorized: false} },
});

module.exports = db;

//sacado de external Database url
//postgres://alden:usZajRRlC3B6upbfY3dNsGIwdaxvWytG@dpg-chdf7pik728nnn6eevag-a.oregon-postgres.render.com/users_crud_iqo2

