import User from "../../model/user/UserModel";
import bcrypt from 'bcrypt';
import { PasswordMismatchError, UserNotFoundError } from "./AuthException";
const jwt = require("jsonwebtoken");


const JWT_SECRET = "your_jwt_secret"; // Replace with your secret key


export async function userLogin(email: string, password: string) {
    try {
      const userDetail = await User.findOne({ email }).exec();
       
      if (!userDetail) {
        throw new UserNotFoundError("User not found");
      }
  
      if (userDetail.password !== password) {
        throw new PasswordMismatchError("Password does not match");
      }
      
   // Generate JWT token
      const token = jwt.sign(
        {
          id: userDetail._id,
          email: userDetail.email,
          role: userDetail.role,
        },
        JWT_SECRET,
        { expiresIn: "1h" } // Token expiration time
      );

      return {
        _id: userDetail._id,
        email: userDetail.email,
        name: userDetail.name,
        role: userDetail.role,
        token: token,
      };
     
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
    }
  
    return null;
  }

  export async function getAllUSer() {
    try {
      const userDetail = await User.find().exec();
      return userDetail;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
    }
  
    return null

  }

  export async function createAccount(data:any) {
    try{
        if (!data.email || !data.password || !data.name) {
            throw new Error("Missing required fields");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create the new user
        const newUser = await User.create({
            ...data,
            password: hashedPassword
        });

        return newUser;
    }catch(err){
        if (err instanceof Error && err.message === "User already exists") {
            throw err;
          } else {
            throw new Error("Internal server error");
          }
  }
}