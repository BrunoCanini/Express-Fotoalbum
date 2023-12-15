const express = require("express");
const router = express.Router();

const { body, checkSchema } = require("express-validator");
const photoController = require("../controllers/photo");

const photoValidationCreate = require("../validations/photoValidationCreate");
const photoValidationUpdate = require("../validations/photoValidationUpdate");

// GET /photo
router.get('/', photoController.index);

// GET /photo/:id
router.get('/:id', photoController.show);

// POST /photo
router.post('/', checkSchema(photoValidationCreate), photoController.store);

// PUT /photo/:id
router.put('/:id', checkSchema(photoValidationUpdate), photoController.update);

// DELETE /photo/:id
router.delete('/:id', photoController.destroy);

module.exports = router