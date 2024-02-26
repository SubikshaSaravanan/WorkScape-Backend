const express = require("express");
const route = express.Router();



route.get("/",(request,response) =>{
    response.json({message:"home Route"})
})


module.exports = route;