const express = require('express');
const router = express.Router();
const devisController = require ('../Controllers/deviscontroller')
router.post('/adddevis', devisController.addDevis);
router.post('/adddevis2', devisController.addDevis2);
router.get('/getall', devisController.getAll);
router.get('/user/:email', devisController.getDevisByUserEmail);
router.put('/valider/:id', devisController.valider);
router.put('/refuser/:id', devisController.refuser);
router.put('/recu/:id', devisController.recu);
router.put('/programme/:id', devisController.programme);
router.get('/getNumDevisByVehicule/:make/:model/:immatriculation', devisController.getNumDevisByVehicule);
router.get('/getdevis/:numdevis', devisController.getDevisByNumDevis);
router.put('/update/:id', devisController.updateDevis);





module.exports = router;
