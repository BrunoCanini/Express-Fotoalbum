const express = require("express");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next){

    // leggo il jwt ottenuto
    const bearerToken = req.header("Authorization")

    if(!bearerToken){
        return res.status(401).send("Token mancante")
    }

    // estraggo la parte del token toglieno il bearer
    const token = bearerToken.split(" "[1]);

    // controllo che sia valido
    // token, jwt secret, opzioni
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    
    if(!isValid){
        return res.status(401).send("Token non valido");
    }
    // next o no
    next()
}