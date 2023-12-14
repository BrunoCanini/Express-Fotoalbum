const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categories");


// POST /photo
router.post('/', categoriesController.store);


module.exports = router