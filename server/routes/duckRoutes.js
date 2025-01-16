const express = require('express');
const router = express.Router();
const duckController = require('../controllers/duckController')

router.get('/',duckController.getAllDucks);
router.post('/',duckController.createOrUpdateDuck);
router.put('/:id',duckController.editDuck);
router.delete('/:id',duckController.deleteDuck);

module.exports = router;