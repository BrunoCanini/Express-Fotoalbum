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
        }
    },
    description:{
        in: ["body"],
        isString: {
            errorMessage: "il content deve essere una stringa"
        }
    },
    image:{
        in: ["body"],
        isString: {
            errorMessage: "l image deve essere una stringa"
        }
    },
    visible:{
        in: ["body"],
        isBoolean: true,
    },
    categories:{
        in: ["body"],
        notEmpty:{
            errorMessage: "categories mancante"
        },
    }
}