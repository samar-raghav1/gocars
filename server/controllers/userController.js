import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";

const generateToken = (userId)=>{
    const payload=userId;
    return jwt.sign(payload,process.env.JWT_SECRET)
}

export const userRegister=async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        if(!name || !email ||!password){
            console.log("All fields are required");
            return res.json({success:false , message:"Fill all the fields"})
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return res.json({success:false , message:"User already exist"})
        }
        
        const hassedPassword =await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password:hassedPassword
        })
        

        const token = generateToken(user._id.toString())
        res.json({success:true,token, user})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
        
    }
}


export const userLogin=async(req,res)=>{
    try {
        const {email,password}= req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
              return res.json({success:false,message:"Invalid email or password"})
        }
        const token = generateToken(user._id.toString())
        res.json({success:true,token , user})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

export const getUserData=async(req,res)=>{
    try {
        const {user}=req;
        res.json({success:true,user})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

export const getUserCars=async(req,res)=>{
    try {
        const cars = await Car.find({isAvaliable:true})
        res.json({success:true,cars})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}