const mysql = require('mysql');
const config = require("../config/config.json");

//conectarnos a nuestra DB
var connection = mysql.createConnection(config.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB Conectada correctamente");
    }
});
//fin de conexion db

var sedeDB = {};


sedeDB.getAll = function (funCallback) {
    connection.query("SELECT * FROM sedes where estado >=1", function (err, result, fields) {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            funCallback(undefined, result);
        }
    });
}

sedeDB.getByIdSede = function (idsede,funCallback) {
    connection.query("SELECT * FROM sedes WHERE idsede=?",idsede, function (err, result, fields) {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            if(result.length>0){
                funCallback(undefined, result[0]);
            }else{
                funCallback({
                    message: "No se encontro la sede"
                });
            }
            
        }
    });
}

sedeDB.create = function (sede, funCallback) {
    var query = 'INSERT INTO sedes (nombre,direccion,localidad,cod_postal) VALUES (?,?,?,?)'
    var dbParams = [sede.nombre, sede.direccion, sede.localidad, sede.cod_postal];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            if(err.code == 'ER_DUP_ENTRY'){
                funCallback({
                    message: `Ya existe`,
                    detail: err
                });
            }else{
                funCallback({
                    message: "Surgio un problema, contactese con un administrador. Gracias",
                    detail: err
                });
            }
            
            console.error(err);
        } else {
            funCallback(undefined, {
                message: `Se creo la sede ${sede.nombre} ${sede.direccion} ${sede.localidad} ${sede.cod_postal}`,
                detail: result
            });
        }
    });
}

/**
 * 
 * @param {*} idsede 
 * @param {*} sede 
 * @param {*} funCallback 
 *         retorna:
 *              code = 1 (EXITO)
 *              code = 2 (NOT FOUND) (NO encontro elemento)
 *              code = 3 (ERROR)
 * 
 */
sedeDB.update = function (idsede, sede, funCallback) {
    var query = 'UPDATE sedes SET nombre = ?, direccion = ?, localidad = ?, cod_postal = ? WHERE idsede = ?'
    var dbParams = [sede.nombre, sede.direccion, sede.localidad, sede.cod_postal, idsede];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            funCallback({
                code:3,
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            if (result.affectedRows == 0) {
                funCallback({
                    code:2,
                    message: `No se encontro la sede ${idsede}`,
                    detail: result
                });
            } else {
                funCallback({
                    code:1,
                    message: `Se modifico la sede ${sede.nombre} ${sede.direccion} ${sede.localidad} ${sede.cod_postal}`,
                    detail: result
                });
            }
        }
    });

}


/**
 *  
 * @param {*} idsede 
 * @param {*} funCallback
 *         retorna:
 *              code = 1 (EXITO)
 *              code = 2 (NOT FOUND) (NO encontro elemento)
 *              code = 3 (ERROR)
 * 
 */
sedeDB.logdelete = function (idsede, funCallback) {
    connection.query("UPDATE sedes SET estado = 1 WHERE idsede = ?",idsede, function (err, result, fields) {
        if (err) {
            funCallback({
                code:3,
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            }); 
            console.error(err);
        } else {
            if (result.affectedRows == 0) {
                funCallback({
                    code:2,
                    message: `No se encontro el id  ${idsede} de la sede`,
                    detail: result
                }); 
            } else {
         //       console.error(err);
                    funCallback({
                    code:1,
                    message: `Se modifico la sede con el id ${idsede}`,
                    detail: result
                }); 
            }
        }
    });
}

module.exports = sedeDB;
