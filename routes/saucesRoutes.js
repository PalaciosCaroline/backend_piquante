const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); 
const sauceController = require('../controllers/sauceController');

router.get('/', auth,sauceController.getAllSauces);
router.get('/:id', auth,sauceController.getSauce);
router.post('/', auth, multer, sauceController.createSauce);
router.put('/:id', auth, multer, sauceController.updateSauce); 
router.delete('/:id', auth, sauceController.deleteSauce);
router.post('/:id/like', auth, sauceController.likeSauce);

module.exports = router;


