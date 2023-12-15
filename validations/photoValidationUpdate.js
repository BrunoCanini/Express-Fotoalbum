const { body } = require("express-validator");
/**
 * @type {import("express-validator").Schema}
 */

module.exports = {
    title:{
        in: ["body"],
        notEmpty:{
            errorMessage: "title mancante"
        },
        isString: {
            errorMessage: "title deve essere una stringa"
        },
        optional: true,
    },
    description:{
        in: ["body"],
        isString: {
            errorMessage: "il content deve essere una stringa"
        },
        optional: true,
    },
    image:{
        in: ["body"],
        isString: {
            errorMessage: "l image deve essere una stringa"
        },
        optional: true,
    },
    visible:{
        in: ["body"],
        isBoolean: true,
        optional: true,
    },
    categories:{
        in: ["body"],
        notEmpty:{
            errorMessage: "categories mancante"
        },
        optional: true,
    }
}