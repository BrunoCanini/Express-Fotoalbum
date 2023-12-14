const express = require("express");
const router = express.Router();

const photoController = require("../controllers/photo");

// GET /photo
router.get('/', photoController.index);

// GET /photo/:id
router.get('/:id', photoController.show);

// POST /photo
router.post('/', photoController.store);

// PUT /photo/:id
router.put('/:id', photoController.update);

// DELETE /photo/:id
router.delete('/:id', photoController.destroy);

module.exports = router