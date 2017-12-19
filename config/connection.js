// module.exports = function(emitter) {
//    require("dotenv").config();
   
//    const Mysql = require("mysql");
//    const connection = process.env.JAWSDB_URL ?
//       Mysql.createConnection(process.env.JAWSDB_URL) :
//       Mysql.createConnection({
//          host: process.env.DB_HOST,
//          port: process.env.DB_PORT,
//          user: process.env.DB_USER,
//          password: process.env.DB_PASSWORD,
//          database: "burgers_db"
//       });

//    emitter.once("connect-sql", function() {
//       connection.connect((err) => {
//          !!err && emitter.emit("error");
//          emitter.emit("sql-connected", connection);
//       });
//    });

//    return connection;
// }