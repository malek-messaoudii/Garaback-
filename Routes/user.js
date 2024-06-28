const express=require('express');
const router=express.Router();
const userController =require ('../Controllers/usercontroller');


router.post('/login',userController.login);
router.post('/register',userController.register);
router.get('/getuser',userController.getUserByEmail)

module.exports=router;