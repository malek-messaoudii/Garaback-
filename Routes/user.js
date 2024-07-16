const express=require('express');
const router=express.Router();
const userController =require ('../Controllers/usercontroller');
const user = require ('../Models/user')

router.post('/login',userController.login);
router.post('/register',userController.register);
router.get('/getuser/:email',userController.getUserByEmail);
router.put('/updateuser/:email', userController.updateUser);
router.put('/update/:email', userController.updateUser1);
router.get( '/all' ,(req,res)=>{
    user.find()
     .then((AllUsers)=>{res.send(AllUsers);}
    )
     .catch(
        (error)=>{res.send(AllUsers);}
     )
})
router.delete('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await user.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    });
module.exports=router;