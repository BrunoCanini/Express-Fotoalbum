const express = require("express");
const router = express.Router();

const Controller = require("../controllers/");


// POST /photo
router.post('/', Controller.store);


module.exports = router