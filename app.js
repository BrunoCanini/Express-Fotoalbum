const express = require('express');
const dotenv = require('dotenv');
const photoRouter = require("./routers/photo");
const categoriesRouter = require("./routers/categories");
const errorsFormatterMiddlewares = require("./middlewares/errorsFormatter");
const notFoundMiddlewares = require("./middlewares/notFound");

dotenv.config();

const app= express();

// apllication/json convertiti in un oggetto javascript, accesso tramite req.body
app.use(express.json());
// configurazioen file statici
app.use(express.static("public"))

// ROTTE
app.use('/photo', photoRouter);
app.use('/categories', categoriesRouter);

// Middlewares
app.use(notFoundMiddlewares);
app.use(errorsFormatterMiddlewares);


app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})