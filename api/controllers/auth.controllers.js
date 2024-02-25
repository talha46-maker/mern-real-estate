/*
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import  JWT  from "jsonwebtoken";


export const signup = async (req,res,next)=>{

const{username  ,email , password} = req.body;

const salt  = await bcryptjs.genSalt(12)

const hashedPassword = await bcryptjs.hash(password,salt);

const newUser = new User ({username ,email, password:hashedPassword });


try{await newUser.save()
res.status(201).json('user created successfully!');
}catch (error){
    next(error);

}

};
export const signin = async (req,res,next)=>{
const {email,password}=req.body;
try {
    const ValidUser = await User.findOne({ email});
    if (!ValidUser) return next(errorHandler(404,'user not found!'));
    const validPassword= bcryptjs.compareSync(password, ValidUser.password);
    if(!validPassword) return next(errorHandler(401,'wrong credentials  !'));
    const token =jwt.sign({id:ValidUser._id }, process.env.JWT_SECRET)
    res.cookie('access_token',token, {httpOnly:true})
    .status(200)
    .json(ValidUser);
} catch (error) {
    next(error);
}
}
*/







import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import JWT from "jsonwebtoken"; // Corrected import name to JWT

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json('user created successfully!');
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'user not found!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'wrong credentials  !'));
        const token = JWT.sign({ id: validUser._id }, process.env.JWT_SECRET); // Corrected JWT usage
        const{password:pass,...rest}=validUser._doc ;
        res
        .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};
