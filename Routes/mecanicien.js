const express = require('express');
const router = express.Router();
const mecanicienController = require('../Controllers/mecanicien');

router.post('/addmecan', mecanicienController.createMecanicien);
router.get('/getmecan', mecanicienController.getMecaniciens);
router.get('/getmecan/:id', mecanicienController.getMecanicienById);
router.put('/updatemecan/:id', mecanicienController.updateMecanicien);
router.delete('/deletemecan/:id', mecanicienController.deleteMecanicien);
router.get('/user/:emailperso', mecanicienController.getMecanByUserEmail);


module.exports = router;
