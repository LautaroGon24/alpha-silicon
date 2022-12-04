require("rootpath")();
const express = require('express');
const app = express();

const sedeDB = require("../datasource/sedesDB.js");


app.get('/', getAll);

app.get('/:idsede', getByIdSede);

app.post('/', create);

app.put('/:idsede', update);

app.delete('/:idsede', eliminacionlogica);

// Metododo para listar todas las sedes
function getAll(req, res) {
    sedeDB.getAll(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para buscar sede por su id
function getByIdSede(req, res) {
    sedeDB.getByIdSede(req.params.idsede,function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para agregar sedes
function create(req, res) {
    sedeDB.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para modificar sede
function update(req, res) {
    sedeDB.update(req.params.idsede, req.body, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    });
}

// Metodo para eliminar sedes cambiando el estado a 0
function eliminacionlogica(req, res) {
    sedeDB.logdelete(req.params.idsede, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
                res.status(404).json(result);  
        } else if (result.code == 1) {      
            res.json(result);
        }
    });
}

module.exports = app;