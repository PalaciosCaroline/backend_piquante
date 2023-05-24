const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); 
const sauceController = require('../controllers/sauceController');

router.get('/', auth,sauceController.getAllSauces);
router.get('/:id', auth,sauceController.getOneSauce);
router.post('/', auth, multer, sauceController.createSauce);
router.put('/:id', auth, multer, sauceController.modifySauce); 
router.delete('/:id', auth, multer, sauceController.deleteSauce);
router.post('/:id/like', auth, sauceController.likeDislikeSauce);

module.exports = router;


