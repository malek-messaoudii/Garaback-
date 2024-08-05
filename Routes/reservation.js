const express = require('express');
const router = express.Router();
const reservationController = require('../Controllers/reservation');

router.post('/add', reservationController.addreserv);
router.get('/getall', reservationController.getall);
router.get('/getbyid/:id', reservationController.getbyid);
router.put('/update/:id', reservationController.update);
router.delete('/delete/:id', reservationController.delete);
router.get('/user/:email', reservationController.getReservationByUserEmail); 

module.exports = router;