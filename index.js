//initiate server
const express = require("express");
const db = require("./database")
const server = express();

//middleware here
server.use(express.json());

//create end points here






//start server
server.listen(8000, () => {
    console.log("server started at http://localhost:8000")
});