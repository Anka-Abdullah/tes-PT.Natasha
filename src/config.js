const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "pelajar",
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  }
});

module.exports = connection;
