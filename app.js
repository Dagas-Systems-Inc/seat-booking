require("dotenv").config();
require("console-stamp")(console, '[HH:MM:ss.l]');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const logger = require("morgan");
const createError = require("http-errors");
console.log("Setting PORT to ==>", process.env.PORT);

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger(':date[clf] ":method :url"'));
app.use(cors());
app.use(bodyParser.json({limit: '300mb'}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '300mb', 
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
process.on("uncaughtException", function(err){
    console.error((err && err.stack) ? err.stack : err);
});

app.get("/dogs", (request, response, next) => {
    let id = request.params.id;
    console.log("You are hitting the / request endpoint with data", id);
    response.status(200).json({
        responseMessage: `Yes u called me on the root route i have responded ${id}`
    })
});

app.get("/dogs/:id", (request, response, next) => {
    let id = request.params.id;
    console.log("You are hitting the / request endpoint with data", id);
    response.status(200).json({
        responseMessage: `Yes u called me on the root route i have responded ${id}`
    });
});

app.post("/dogs/create", (req, res, next) => { 
    console.log(`You are hitting the ${req.url} endpoint with data`, req?.body);
    let height = req?.body?.height;
    let color = req?.body?.color;
    let breed = req?.body?.breed;
    let gender = req?.body?.gender;
    let isDeleted = req?.body?.isDeleted;

    res.status(200).json({
        status: "success",
        responseCode: "200",
        responseMessage: `Returning the animal just created`,
        data: {
            height,
            color,
            breed,
            gender,
            isDeleted
        }
    });
});
 
//catch a 404 and respond no route was hit until this point
app.use(function(req, res, next) {
    next(createError(404));
})

//Say SOmething about this error to the user
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = ((req.app.get("env") === 'development') ? err : {});

    //rendering to the view with the error details
    res.status(err.status || 500);
    res.render("error");
})

module.exports = app;