const express = require('express');
const router = express.Router();

const sauceController = require('../controllers/sauceController');

router.get('/', sauceController.getAllSauces);
router.get('/:id', sauceController.getSauce);
router.post('/', sauceController.createSauce);

module.exports = router;