const DEBUG = true;

const Path = require("path"),
   Join = Path.join;

// handling uncaught errors
const errorHandler = require(Join(__dirname, "../errorhandler/handler.js"));

module.exports = function(sequelize, Datatype) {
   const emitter = require(Join(__dirname, "../server.js"));

   const burger = sequelize.define("burgers", {
      burger_name: {
         type: Datatype.STRING,
         allowNull: false,
         validate: {
            is: /^[\sa-z]+$/i,
            not: /\\s/,
         }
      },
      devourer: {
         type: Datatype.STRING,
         allowNull: true,
      },
      devoured: {
         type: Datatype.BOOLEAN,
         allowNull: false,
         defaultValue: false
      },
      devouredTime: {
         type: Datatype.DATE,
         allowNull: true,
         defaultValue: Datatype.Now
      }
   }, {
      timestamps: false,
      freezeTableName: true
   });

   burger.sync().then(() => {
      burger.findAll().then((data) => {
         !!(data.length > 4) ? console.log("Initiated") :
            burger.bulkCreate([{
               burger_name: "Reuben",
            }, {
               burger_name: "Pull Pork Sub"
            }, {
               burger_name: "Tostini"
            }]).catch((err) => {
               errorHandler(err);
            });
      });
   });

   return burger;
}