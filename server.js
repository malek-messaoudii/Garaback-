const express =require("express");
require ('./Config/connect');
const cors = require("cors");
const path = require('path');
const app = express();
const userRouter =require ('./Routes/user');
const formcontactRouter = require ('./Routes/contactform');
const devisRouter = require('./Routes/devis')
const vehiculeRouter = require ('./Routes/vehicule')
const rdvRouter = require('./Routes/rdv')
const promotionRouter = require ('./Routes/promotion')


app.use(cors({
    origin: 'http://localhost:4200' ,
    optionsSuccessStatus: 200 ,
    credentials: true 
  }));

const router = express.Router();

app.use(express.json());

app.use('/promotions', promotionRouter);
app.use('/user', userRouter);
app.use('/formcontact', formcontactRouter);
app.use('/devis', devisRouter);
app.use('/vehicules', vehiculeRouter);
app.use('/rdv', rdvRouter);





app.listen(4000,()=>{
    console.log('server work');
})