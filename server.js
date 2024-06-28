const express =require("express");
require ('./Config/connect');
const cors = require("cors");
const path = require('path');
const app = express();
const userRouter =require ('./Routes/user');
const formcontactRouter = require ('./Routes/contactform')

app.use(cors({
    origin: 'http://localhost:4200' ,
    optionsSuccessStatus: 200 ,
    credentials: true 
  }));


const router = express.Router();

app.use(express.json());


app.use('/user', userRouter);
app.use('/formcontact', formcontactRouter);



app.listen(4000,()=>{
    console.log('server work');
})