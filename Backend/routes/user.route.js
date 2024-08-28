import express from 'express';
import { allUsers, login, logout, signup } from '../controller/user.controller.js';
import secureRoute from '../middleware/secureRoute.js';

const router = express.Router();

//we Post the schema on postman Api in our database.

//controller signup function
router.post("/signup",signup);

//controller login function
router.post("/login",login);

//controller logout function
router.post("/logout",logout);

//exported users and middleware
router.get("/allusers", secureRoute, allUsers);


export default router;
//to be used in index.js
