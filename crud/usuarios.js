const connection = require('../connection');
const querystring = require('querystring');
// Recupera Todos Registro.
module.exports.findAll = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = 'SELECT * FROM mojodb.usuarios';
    connection.query(sql, (error, rows) => {
      if (error) {
        callback({
          statusCode: 500,
          body: JSON.stringify(error)
        })
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            usuarios: rows
          })
        })
      }
    })
};

// Recupera un Registro. Pasa el dato, en el parametro.
module.exports.findOne = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = 'SELECT * FROM mojodb.usuarios WHERE id = ?';
    connection.query(sql, [event.pathParameters.usuario], (error, row) => {
      if (error) {
        callback({
          statusCode: 500,
          body: JSON.stringify(error)
        })
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            usuario: row
          })
        })
      }
    })
  };

// Crea un Nuevo Registro.
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  const body = JSON.parse(event['body'])
  const sql = 'INSERT INTO mojodb.usuarios SET username = ?, email = ?';
  
  connection.query(sql, [body.username, body.email], (error, result) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          res: `Todo insertado correctamente con id ${result.insertId}`
        })
      })
    }
  })
};
// Eliminacion de Usuario.
module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = 'DELETE FROM mojodb.usuarios WHERE id = ?';
  connection.query(sql, [event.pathParameters.usuario], (error, result) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          res: `Todo eliminado correctamente`
        })
      })
    }
  })
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const body = JSON.parse(event['body'])

 
  const sql = 'UPDATE usuarios SET username = ?, email = ? WHERE id = ?';
  connection.query(sql, [body.username, body.email, event.pathParameters.usuario], (error, result) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          res: `Todo actualizado correctamente`
        })
      })
    }
  })
};