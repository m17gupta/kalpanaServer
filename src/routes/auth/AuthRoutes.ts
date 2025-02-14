import { createAccount, getAllUSer, userLogin } from "../../controller/authController/AuthController";

const express1 = require('express');

//const authController = require('../../controller/auth/AuthController');

const authRoute = express1.Router();

authRoute.post('/login', async (req:any, res:any) => {
  try {
    const { email, password } = req.body;
  
    const userAuth = await userLogin(email, password);

    if (userAuth) {
      res.status(200).json(userAuth);
    }
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Internal server error' });
  }
});


authRoute.get('/get-all-user', async (req:any, res:any) => {
    try {
        const userDetail = await getAllUSer();
    
        if (userDetail) {
        res.status(200).json(userDetail);
        }
    } catch (err) {
        res.status(500).json({ message: err instanceof Error ? err.message : 'Internal server error' });
    }
});
// // create Account 
authRoute.post('/create-account', async (req:any, res:any) => {
  try {
    const data = req.body;
   // console.log("user data",data)
    const newUser = await createAccount(data);

    if (newUser) {
      res.status(200).json(newUser);
    }
  } catch (err) {
    // Check if the error i s a user-related error (e.g., user already exists)
    if (err instanceof Error && err.message === "User already exists") {
      res.status(400).json({ message: err.message });
    } else {
      // For other errors, send a 500 status code
      res.status(500).json({ message: 'Internal server error' });
    } 
  } 
});
  
module.exports = authRoute;