const express = require("express");
const db = require("./utils/database");
const  Users = require("./models/users.mode");
require("dotenv").config()

const PORT = process.env.PORT || 3000;

//creamos una instancia de express

db.authenticate() // es un método asincrono
    .then(()=>console.log("Database conectada"))
    .catch((err)=>console.error(err))

db.sync()
    .then(()=> console.log("BD conectada"))
    .catch((err)=> console.log(err))

const app = express();

app.use(express.json())

app.get("/", (req, res)=>{
    res.send("servidor funciona")
})

app.post("/users", async (req, res)=>{
    try{
        const newUser = req.body;
        //INSERT INTO users (firstname, lastname, email, password) VALUES ()
        await Users.create(newUser);
        res.status(201).send();
    } catch (err) {
        res.status(400).json(err)
    }
})

/* Obtener todos los usuarios de la BD */
// SELECT * FROM users;
// Users.findAll()
// SELECT firstname, lastname, email, password FROM users;
// Lo hacemos colocando ese objeto en findAll
app.get("/users", async (req, res) =>{
    try{
        const users = await Users.findAll({
            /* attributes: ["firstname", "lastname", "email"] */
            attributes: {
                exclude: ["id", "password"]
            }
        });
        res.json(users)
    } catch (err) {
        res.status(400).json(err);
    }
})

// Consultar un solo dato de la base de datos
// mediante params

app.get("/users/id/:id", async (req, res)=>{
    try{
        //para recuperar el parametro de ruta req.params
        // es un objeto que tiene todos y cada uno de estos valores {id: 5}
        const {id} = req.params;

        const user = await Users.findByPk(id);
        res.json(user)
    } catch (err) {
        res.status(400).json(err);
    }
})

// si quiero buscar por otro campo
app.get("/users/email/:email", async (req, res)=>{
    try{
        //para recuperar el parametro de ruta req.params
        // es un objeto que tiene todos y cada uno de estos valores {email: valor}
        const {email} = req.params;

        const user = await Users.findOne({
            where: {email}
        });
        res.json(user)
    } catch (err) {
        res.status(400).json(err);
    }
})

//eliminar un usuario
// DELETE FROM users WHERE id=3; eliminar usuario con id igual a 3

app.delete("/users/:id", async (req, res) => {
    try{
        const {id} = req.params;
        await Users.destroy({
            where: {id} //where {id: id}
        })
        res.status(204).send()
    } catch (err) {
        res.status(400).json(err);
    }
})

// actualizar informacion de un usuario
// UPDATE users SET firstname="jjj", lastname="hhh" WHERE id=x;
app.put("/users/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const { firstname, lastname } = req.body;
        await Users.update(
            { firstname, lastname },
            {
                where: {id}
            }
        );        
        res.status(204).send();
    } catch (err) {
        res.status(400).json(err);
    }
})

app.listen(PORT, ()=>{
    console.log("Servidor iniciado en port 3000")
})