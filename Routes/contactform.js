const express=require('express');
const router=express.Router();
const contactformController =require ('../Controllers/contactform');

router.post('/addformcontact',contactformController.addContactForm);
router.get('/getall', contactformController.getall);
router.delete('/delete/:id', contactformController.delete);



module.exports=router;