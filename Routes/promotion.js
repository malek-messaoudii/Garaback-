const express = require('express');
const router = express.Router();
const promotionController = require('../Controllers/promotioncontroller');

router.get('/', promotionController.getAllPromotions);
router.post('/register', promotionController.addPromotion);
router.delete('/delete/:id', promotionController.deletePromotion);

module.exports = router;