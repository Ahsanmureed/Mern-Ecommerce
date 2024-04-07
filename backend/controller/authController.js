import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
const signupUser = async(req,res)=>{
    const { username, email, password, phone, address } = req.body;;

        // validation
        if(!username || !email || !password || !phone || !address){
            return res.status(401).send({
                success :true,
                message:"Please enter required fields"
            })
        }
        const checkName = await userModel.findOne({username}) ;
        if(checkName){
            return res.status(401).send({
                success:false,
                message:"Username Already Registered"
            })
        } 

        const checkEmail = await userModel.findOne({email}) ;
        if(checkEmail){
            return res.status(401).send({
                success:false,
                message:"Email Already Registered"
            })
        } 
        const hashedPassowrd = await bcrypt.hash(password,10)
        const newUser = new userModel({
            username,
            email,
            password: hashedPassowrd,
            phone,
            address
          });
          await newUser.save();
        return res.status(201).send({
            success:true,
            message:"User Created Successfully",
            
        })
     } 
const loginUser =async(req,res)=>{
    const {email,password} = req.body;
    // validation
    if( !email || !password){
        return res.status(401).json({
            success :true,
            message:"Please enter required fields"
        })
    }
    const user = await userModel.findOne({email}) ;
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Incorrect Email"
            })
        } 
        const comparePassword = await bcrypt.compare(password,user.password);
        if(!comparePassword){
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect"
            })
        }
        const token  = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1hr"});
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
              _id: user._id,
              username: user.username,
              email: user.email,
              phone: user.phone,
              address: user.address,
              role: user.role,
            },
            token,
          });
       
}

const updateUser = async (req, res) => {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Updated user successfully",
        updatedUser,
      });
    } catch (error) {}
  };
export {signupUser,loginUser,updateUser}