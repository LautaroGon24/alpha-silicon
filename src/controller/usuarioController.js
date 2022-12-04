require("rootpath")();
const express = require('express');
const app = express();

const usuarioDB = require("../datasource/usuariosDB.js");


app.get('/', getAll);

app.get('/:idusuario', getByIdUsuario);

app.post('/', create);

app.put('/:idusuario', update);

app.delete('/:idusuario', eliminacionlogica);

// Metododo para listar todas los usuarios
function getAll(req, res) {
    usuarioDB.getAll(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para buscar usuario por su id
function getByIdUsuario(req, res) {
    usuarioDB.getByIdUsuario(req.params.idusuario,function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para agregar usuarios
function create(req, res) {
    usuarioDB.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para modificar usuario
function update(req, res) {
    usuarioDB.update(req.params.idusuario, req.body, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    });
}

// Metodo para eliminar usuarios cambiando el estado a 0
function eliminacionlogica(req, res) {
    usuarioDB.logdelete(req.params.idusuario, function (result) {
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