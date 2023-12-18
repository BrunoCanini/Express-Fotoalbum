const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {validationResult, matchedData} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


async function register(req, res){

    const validation = validationResult(req);

    if(!validation.isEmpty()){
        return res.status(422).json(validation.array())
    }

    const datiIngresso = matchedData(req);
    // console.log(datiIngresso)

    // devo criptare la password
    datiIngresso.password = await bcrypt.hash(datiIngresso.password, 10)

    // console.log(datiIngresso)

    const user = await prisma.user.create({
        data: {
            ...datiIngresso,
        },
        select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            role: true,
        }
    })

    // creiamo il jwt token
    const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
    
    res.send({user, token})
}

async function login(req, res, next){
    // recuper oi dati inseriti dall utente
    const {email, password} = req.body;
    // controllo se l utente esiste
    const user = await prisma.user.findUnique({
        where: {
            email : email
        }
    })

    if(!user){
        throw new Error("Utente non trovato")
    }

    // controlliamo che la password è corretta
    const passMatch = await bcrypt.compare(password, user.password);

    if(!passMatch){
        return next(new Error("Invalid password"))
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })

    // elimino la password solo nella vista no nel db
    delete user.password
    
    res.send({user, token})

}

async function me(req, res){

    const {id} = req.user;

    const user = await prisma.user.findUnique({
        where: {
            id,
        }
    })

    if(!user){
        throw new Error("Utente non trovato")
    }

    delete user.password

    res.json({user});

}

module.exports= {
    register,
    login,
    me
}