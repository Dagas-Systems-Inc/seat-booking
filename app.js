require("dotenv").config();
const express = require("express");

console.log("Setting PORT to ==>", process.env.PORT);

var app = express();

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
    })
});

app.post("/dogs/create", (req, res, next) => { 
    console.log(`You are hitting the ${req.url} endpoint with data`, req.body);
    // let height = req.body.height;
    // let color = req.body.color;
    // let breed = req.body.breed;
    // let gender = req.body.gender;
    // let isDeleted = req.body.isDeleted;
})

module.exports = app;