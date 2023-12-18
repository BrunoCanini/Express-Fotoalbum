const express = require('express');
const dotenv = require('dotenv');
const photoRouter = require("./routers/photo");
const categoriesRouter = require("./routers/categories");
const errorsFormatterMiddlewares = require("./middlewares/errorsFormatter");
const notFoundMiddlewares = require("./middlewares/notFound");
const authRouter = require("./routers/auth")


dotenv.config();

const app= express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Consenti l'accesso da qualsiasi origine (*), potresti limitarlo alle origini specifiche
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // Altre intestazioni e metodi che devono essere consentiti possono essere aggiunti qui

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }

  next();
});


// apllication/json convertiti in un oggetto javascript, accesso tramite req.body
app.use(express.json());
// configurazioen file statici
app.use(express.static("public"))


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Consenti l'accesso da qualsiasi origine (*), potresti limitarlo alle origini specifiche
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });



// ROTTE
app.use('/photo', photoRouter);
app.use('/categories', categoriesRouter);
app.use('', authRouter)

// Middlewares
app.use(notFoundMiddlewares);
app.use(errorsFormatterMiddlewares);
  

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})