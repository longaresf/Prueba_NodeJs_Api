const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
const { getOperaciones, regOperaciones } = require("./consultas");

const puerto = process.env.PUERTO || 3000;
const servidor = process.env.HOST || 'localhost';

app.listen(puerto, () => {
    console.info(`Servidor disponible en http://${servidor}:${puerto}`);
    });

    app.use(express.static("public"));

    app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
    
    app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
    
    app.set("view engine", "handlebars");
    
    app.engine(
        "handlebars",
        exphbs.engine({
            defaultLayout: "main",
            layoutsDir: `${__dirname}/views/mainLayout`,
            partialsDir: `${__dirname}/views/componentes`,
        })
    );

    app.get("/", async (req, res) => {
        res.render("Home");
});

app.post("/convertir", async (req, res) => {
    const {monto, monedaOrigen, fechaConv, monedaDestino} = req.body;
    const respuesta = await regOperaciones(monto, monedaOrigen, fechaConv, monedaDestino);
    res.send(respuesta);
    });

    app.get("/Buscar", async (req, res) => {
        const fechaBusqueda = req.body;
        const resultado = await getOperaciones(monto, monedaOrigen, fechaConv, monedaDestino);
        res.send(resultado);
        });


        app.get("*", (req, res) => {
            res.send("<center><h1> &#128545; Esta página no existe &#128540; </h1> </center>");
            });
        