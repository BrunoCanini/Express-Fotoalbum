const express = require("express");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next){

    // leggo il jwt ottenuto
    const bearerToken = req.headers.authorization;

    if(!bearerToken){
        return res.status(401).send("Token mancante")
    }

    // estraggo la parte del token toglieno il bearer
    const token = bearerToken.split(" ")[1];

    // controllo che sia valido
    // token, jwt secret, opzioni
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        // passo i dati alla req in modo che possiamo accedere
        req["user"] = user
        // next o no
        next()
    } catch (error) {
        return res.status(401).json({error:error.message})
    }

}