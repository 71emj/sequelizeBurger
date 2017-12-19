const DEBUG = true;

const Path = require("path"),
   Exhbs = require("express-handlebars"),
   Join = Path.join;

// handling uncaught errors
require(Join(__dirname, "../errorhandler/handler.js"))();

module.exports = function(emitter) {
   const ctrlRoute = new require("express").Router(),
      dataBase = require(Join(__dirname, "../models")),
      burgersModel = dataBase["burgers"];

   emitter.once("sql-connected", function() {
 
      ctrlRoute.get("/eat-da-burger", function(req, res) {
         DEBUG && console.log("GET!!");

         console.log(Object.keys(dataBase));
         burgersModel.findAll().then((data) => {

            const burgerName = data.filter((elem) => {
                  return !elem.dataValues.devoured;
               }),
               devouredName = data.filter((elem) => {
                  return elem.dataValues.devoured;
               });

            res.render("index", { burgers: burgerName, devoured: devouredName });
         }).catch((err) => {
            emitter.emit("error", err);
         });
      });
      
      ctrlRoute.get("/", function(req, res) {
         console.log("Redirecting...");
         res.redirect("/eat-da-burger");
      });

      ctrlRoute.get("/api/eat-da-burger", function(req, res) {
         // emitter.emit("render-initial", res, 1);
         burgersModel.findAll().then((data) => {
            res.status(200).send(data);
         }).catch((err) => {
            emitter.emit("error", err);
         });
      });

      ctrlRoute.post("/eat-da-burger", function(req, res) {
         const burger = req.body;

         DEBUG && console.log(burger);
         // emitter.emit("more-burger", burger.name, res);
         burgersModel.create({
            burger_name: burger.name
         }).then((data) => {
            res.status(200).send(data);
         }).catch((err) => {
            emitter.emit("error", err);
         });
      });

      ctrlRoute.put("/eat-da-burger/:id?", function(req, res) {
         const burgerId = req.params.id;

         // DEBUG && console.log(burger);
         // DEBUG && console.log(burger.name);
         // emitter.emit("update-one", burger.name, parseInt(burger.nameid), res);
         burgersModel.update({ 
            devoured: true
         }, {
            where: {
               id: burgerId
            }
         }).then((data) => {
            res.status(200).send(data);
         }).catch((err) => {
            emitter.emit("error", err);
         });
      });
   });

   return ctrlRoute;
}