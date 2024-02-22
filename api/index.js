import  express  from 'express';
/*import App from "../client/src/App";*/
import mongoose from 'mongoose';
import dotenv from'dotenv';

import UserRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';


dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to MongoDB!');
})
.catch((err)=>{console.log(err);});


const app = express();

app.use(express.json());

var server=app.listen(3000,() =>{
    console.log('server is running on prot 3000 ');
}
);
server.timeout=1000000
app.use('/api/user',UserRouter);
app.use('/api/auth',authRouterRouter);