
import  express  from 'express';
/*import App from "../client/src/App";*/
import mongoose from 'mongoose';
import dotenv from'dotenv';
import cors from 'cors';

import UserRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';


dotenv.config();



mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to MongoDB!');
})
.catch((err)=>{console.log(err);});


const app = express();

app.use(express.json());
app.use(cors());

var server=app.listen(3000,() =>{
    console.log('server is running on prot 3000');
}
);

app.use('/api/user',UserRouter);
app.use('/api/auth',authRouter);


app.use((err,req,res,next)=>{
    const statuscode =err.statuscode ||500;
    const message = err.message || 'Internal Server Error';
    return res.status(statuscode).json({
     success:false,
     statuscode,
     message,
});
});

