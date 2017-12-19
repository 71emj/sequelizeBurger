const DEBUG = true;

const Path = require("path"),
   Join = Path.join;

// handling uncaught errors
require(Join(__dirname, "../errorhandler/handler.js"))();

module.exports = function(emitter, connection) {
   // "query-complete" returns data from the sql query
   return {
      selectAll: function(flag) {
         connection.query(
            "SELECT burger_name, devoured, id, date FROM burgers ORDER by id",
            (err, body, fields) => {
               !!err && emitter.emit("error");
               
               DEBUG && console.log("This is selectAll");
               emitter.emit("query-complete", body);
            });
      },
      insertOne: function(burgerName) {
         connection.query(
            "INSERT INTO burgers SET ?", {
               burger_name: burgerName,
               devoured: false,
               date: "(NOW())"
            },
            (err, body, fields) => {
               !!err && emitter.emit("error");
               emitter.emit("query-complete");
               DEBUG && console.log("This is insert one");
            });
      },
      updateOne: function(burgerName, burgerId) {
         DEBUG && console.log(Date.now());
         connection.query(
            "UPDATE burgers SET devoured = 1, date = (NOW()) WHERE burger_name = ? AND id = " + burgerId,
            burgerName,
            (err, body, fields) => {
               !!err && console.log(err);
               emitter.emit("query-complete");
            });
      }
   }
}