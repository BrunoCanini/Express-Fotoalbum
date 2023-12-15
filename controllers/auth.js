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
    console.log(datiIngresso)

    // devo criptare la password
    datiIngresso.password = await bcrypt.hash(datiIngresso.password, 10)

    console.log(datiIngresso)

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

async function login(req, res){
    res.send("login")

}

module.exports= {
    register,
    login
}