const express=require('express');
const router=express.Router();
const rdvController =require ('../Controllers/rdvcontroller');

router.post('/addrdv', async (req, res) => {
    const result = await rdvController.addRdv(req.body);
    res.status(result.success ? 200 : 400).json(result);
});

router.delete('/rdv/:id', async (req, res) => {
    const result = await rdvController.deleteRdv(req.params.id);
    res.status(result.success ? 200 : 400).json(result);
});

router.get('/user/:email', rdvController.getByUserEmail);

router.get('/getall', rdvController.getAll)

router.put('/rdv/:id', async (req, res) => {
    const result = await rdvController.updateRdv(req.params.id, req.body);
    res.status(result.success ? 200 : 400).json(result);
});



module.exports=router;