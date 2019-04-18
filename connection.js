const mysql = require('mysql');

const configDB = {
  //host: 'mojodb.cpse5vpaifmp.us-east-2.rds.amazonaws.com',
  //user: 'mojouser',
  //password: 'Marte2000',
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: 'mojodb',
  debug: true
};  

function initializeConnection(config) {
  function addDisconnectHandler(connection) {
    connection.on("error", function (error) {
      if (error instanceof Error) {
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
          console.error(error.stack);
          console.log("Lost connection. Reconnecting...");

          initializeConnection(connection.config);
        } else if (error.fatal) {
          throw error;
        }
      }
    });
  }
  
  const connection = mysql.createConnection(config);

  // Add handlers.
  addDisconnectHandler(connection);

  connection.connect();
  return connection;
}

const connection = initializeConnection(configDB);

module.exports = connection;