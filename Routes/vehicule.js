const express = require('express');
const router = express.Router();
const vehiculeController = require('../Controllers/vehiculecontroller');

router.post('/addvehicule', vehiculeController.addVehicule);
router.get('/all', vehiculeController.getAllVehicules);
router.get('/:vehiculeId', vehiculeController.getVehiculeById);
router.put('/:vehiculeId', vehiculeController.updateVehicule);
router.delete('/:vehiculeId', vehiculeController.deleteVehicule);
router.get('/user/:email', vehiculeController.getVehiculeByUserEmail); 

module.exports = router;
