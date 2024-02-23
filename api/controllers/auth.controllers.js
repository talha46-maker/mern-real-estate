import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';



export const signup = async (req,res)=>{

const{username  ,email , password} = req.body;

const salt  = await bcryptjs.genSalt(12)

const hashedPassword = await bcryptjs.hash(password,salt);

const newUser = new User ({username ,email, password:hashedPassword });


try{await newUser.save()
res.status(201).json('user created successfully!');
}catch(error){

}

};