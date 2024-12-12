import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRoute from './Router/authRoute.js';
import cors from 'cors'

dotenv.config()
const app = express();

const port = process.env.PORT || 3000;
const MONGOURL = process.env.MONGOURL

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/auth',authRoute)


mongoose.connect(MONGOURL)
.then(()=>{
    console.log("connected to mongo",MONGOURL);
})
.catch(()=>{
    console.log("errro when connecting to mongo")
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})