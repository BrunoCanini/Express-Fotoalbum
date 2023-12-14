const express = require('express');
const dotenv = require('dotenv');
const photoRouter = require("./routers/photo");
const categoriesRouter = require("./routers/categories");

dotenv.config();

const app= express();

// apllication/json convertiti in un oggetto javascript, accesso tramite req.body
app.use(express.json());

// ROTTE
app.use('/photo', photoRouter);
app.use('/categories', categoriesRouter);


app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})