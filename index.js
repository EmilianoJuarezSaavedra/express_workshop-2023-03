
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// JavaScrip es secuencial se lee de arriba para abajo

app.get("/", (req, res, next) => {
    return res.status(200).json( {code: 1, message: "Bienvenido al pokedex"} );
    // Tambien se puede hacer res.status(200).send("Bienvenido al Pokedex");
});

app.use("/pokemon", pokemon);

app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: "URL no encontrado, Vuelve a ingresar la URL correcta"});
});


/*
app.post("/pokemon", (req, res, next) => {
    return res.status(200).send(req.body);
});

app.get("/pokemon", (req, res, next) => {
    return res.status(200).send(pokemon);

    //res.send("Hola: " + req.params.name);
    //console.log("Hola: " + req.params.name);
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
    
    const id = req.params.id -1;
    if(id >= 0 && id < pokemon.length) {
        return res.status(200).send(pokemon[req.params.id -1]);
    }
    return res.status(404).send("pokemon No encontrado");
});

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name;
    
    const pk = pokemon.filter((p) => {
        // el return es para que regrese todo lo que esta adentro
        // de otra forma:  return (p.name.toUpperCase() == name.toUpperCase()) && p;
        return (p.name.toUpperCase() == name.toUpperCase()) ? p : null;   //operador ternario es igual a un if
    });
    // pk es un arreglo entonces tiene longitud, por eso se puede hacer esta comparación
     (pk.length > 0) ? res.status(200).send(pk) : res.status(200).send("Pokemon NO encontrado");  
});  
    /*se puede hacer tambien de esta forma que es mas explicada, pero con cosas mas complicadas no es mejor utilizarlo
    for(i = 0; i < pokemon.length; i++) {
        if (pokemon[i].name.toUpperCase() == name.toUpperCase()) {
            
            return res.status(200).send("Tu pokemon es: " + pokemon[i]);

        }
    }
    return res.status(404).send("Pokemon llamado " + name +" NO existe");*/

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});


/*  --NOTAS--
GET    - Obtener recursos 
POST   - Almacenar/crear recursos
PATCH  - Modificar una parte de un recurso
PUT    - Modificar un recurso
DELETE - Borrar un recurso
*/