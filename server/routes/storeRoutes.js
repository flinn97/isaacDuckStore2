const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

router.post('/order', storeController.createOrder);

module.exports = router;