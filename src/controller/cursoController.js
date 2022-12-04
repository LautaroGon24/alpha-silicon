require("rootpath")();
const express = require('express');
const app = express();

const cursoDB = require("../datasource/cursosDB.js");


app.get('/', getAll);

app.get('/:idcurso', getByIdCurso);

app.post('/', create);

app.put('/:idcurso', update);

app.delete('/:idcurso', eliminacionlogica);

// Metododo para listar todas los cursos
function getAll(req, res) {
    cursoDB.getAll(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para buscar curso por su id
function getByIdCurso(req, res) {
    cursoDB.getByIdCurso(req.params.idcurso,function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para agregar cursos
function create(req, res) {
    cursoDB.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para modificar curso
function update(req, res) {
    cursoDB.update(req.params.idcurso, req.body, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    });
}

// Metodo para eliminar cursos cambiando el estado a 0
function eliminacionlogica(req, res) {
    cursoDB.logdelete(req.params.idcurso, function (result) {
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