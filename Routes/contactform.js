const express=require('express');
const router=express.Router();
const contactformController =require ('../Controllers/contactform');

router.post('/addformcontact',contactformController.addContactForm);


module.exports=router;