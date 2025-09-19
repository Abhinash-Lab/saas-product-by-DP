import {Request,Response} from 'express'
import User from '../../../database/models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// const registerUser = async(req:Request, res:Response) =>{

//   const {username,password,email} = req.body;
//   if(!username || !password || !email){
//     res.status(400).json({
//       message : "please provide username, password, email"
//     })
//   }
//   else{
//     await user.create({
//       username : username,
//       password : password,
//       email : email
//     })
//     res.status(200).json({
//       message : "User Registered successfully"
//     })
//   }
// }

class AuthController{
  static async registerUser(req:Request,res:Response){
    // console.log(req.body);
    if(req.body == undefined){
      res.status(400).json({
        messsage: "No Data was Sent!!"
      })
      return
    }
     const {username,password,email} = req.body;
  if(!username || !password || !email){
    res.status(400).json({
      message : "please provide username, password, email"
    })
    return //yaha return le condition true huda flow downward huna didaina, if false condition vayema muniko code execute hunxa
  }
  
    await User.create({
      username : username,
      password : bcrypt.hashSync(password,12),
      email : email
    })  
    res.status(201).json({
      message : "User Registered successfully"
    })
  }

  static async loginUser(req:Request,res:Response){
    const {email,password} = req.body;
    if(!email || !password){
      res.status(400).json({
        message : "Please provide email and password"
      })
      return;
    }
    const data = await User.findAll({
      where:{
        email : email.toLowerCase()
      }
    })
    if(data.length == 0){
      res.status(404).json({
        message: "User not Registered"
      })
    }else{
      const isPasswordMatch = bcrypt.compareSync(password,data[0].password)
      if(isPasswordMatch){
        //token generation garne
        const token = jwt.sign({id : data[0].id},'thisisscretkey',
        {expiresIn : '5min'})
        res.status(200).json({
          token : token,
          message : "Logged In Successfully" 
        })

      }else{
        res.status(403).json({
          message : "Invalid email or password"
        })
      }
      
    }
  }

}

export default AuthController