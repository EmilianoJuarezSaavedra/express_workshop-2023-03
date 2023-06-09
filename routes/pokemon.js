const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", async (req, res, next) => {

    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    
    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
        query += ` VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
    
        const rows = await db.query(query);

        //ternario como if Nota IMPORTANTE
        (rows.affectedRows == 1) ? res.status(201).json({code: 201, message: "Pokemon insertado correctamente" }) : res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.delete("/:id([0-9]{1,5})", async (req, res, next) => { 
    const query = `DELETE FROM pokemon WHERE pok_id=${req.params.id}`;

    const rows = await db.query(query);

    return (rows.affectedRows == 1) ? res.status(201).json({code: 201, message: "Pokemon Borrado Correctamente" }) : res.status(404).json({code: 404, message: "Pokemon no encontrado"});
});

pokemon.put("/:id([0-9]{1,5})", async (req, res, next) => {

    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = `UPDATE pokemon SET pok_name='${pok_name}', pok_height=${pok_height},`; 
        query += ` pok_weight=${pok_weight}, pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id};`;
        
        console.log(query);
        const rows = await db.query(query);

        //ternario como if Nota IMPORTANTE
        return (rows.affectedRows == 1) ? res.status(201).json({code: 201, message: "Pokemon Actualizado correctamente" }) : res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.patch("/:id([0-9]{1,5})", async (req, res, next) => {
    if(req.body.pok_name){
        
        let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE pok_id=${req.params.id}`; 
        const rows = await db.query(query);

        //ternario como if Nota IMPORTANTE
        return (rows.affectedRows == 1) ? res.status(201).json({code: 201, message: "Pokemon Actualizado correctamente" }) : res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code:500, message:  "Campos incompletos"});    
});

pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT *  FROM pokemon");
    console.log(pkmn);
    return res.status(201).json({code: 201, message: pkmn});
});

pokemon.get('/:id([0-9]{1,5})', async (req, res, next) => {
    const id = req.params.id;

    if(id >= 1 && id <= 722) {
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id= " + id + ";");
        console.log(pkmn);
        return res.status(201).json({ code: 201, message: pkmn });
        
    }
    return res.status(404).json({ code: 404, message: "El Pokemon No se ha encontrado con el id: " + id });
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name= '" + name + "';");
     //operador ternario es igual a un if
     return (pkmn.length > 0) ? res.status(201).json({code: 201, message: pkmn}) : res.status(404).json({code: 404, message: "Pokemon NO encontrado con el nombre: " + name});  
});  

module.exports = pokemon;
    