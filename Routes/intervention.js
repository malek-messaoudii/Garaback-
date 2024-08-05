const express = require('express');
const router = express.Router();
const interventionController = require('../Controllers/intervcontroller');

router.post('/addinter', interventionController.upload.single('pdf'), interventionController.addinterv);
router.get('/getbyemail/:emailperso', interventionController.getintervByUserEmail);
router.get('/getall', interventionController.getInterventions)

module.exports = router;
