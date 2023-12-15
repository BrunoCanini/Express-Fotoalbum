const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @type {import { "express-validator" }.Schema}
 */

module.exports = {
    name: {
        in: ["body"],
        notEmpty:{
            options:{
                ignore_whitespace: true,
            },
            errorMessage: "il nome inserito non è valido"
        },
    },
    surname: {
        in: ["body"],
        notEmpty:{
            options:{
                ignore_whitespace: true,
            },
            errorMessage: "il nome inserito non è valido"
        }
    },
    email: {
        in: ["body"],
        isEmail: true,
        notEmpty: true,
        errorMessage: "l emai inserita non è valida",
        custom:{
            options: async (value) => {
                const emailExist = await prisma.user.findUnique({
                    where: {
                        email: value
                    }
                })

                if(emailExist){
                    return Promise.reject("l email inserita è gia in uso")
                }

                return true;
            }
        },
    },
    password:{
        in: ["body"],
        isStrongPassword: {
            options: {
                minLenght: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }
        },
        errorMessage: "password inserita non valida"  
    },
}