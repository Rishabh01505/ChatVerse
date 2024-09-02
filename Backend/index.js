/*
see installation on expressjs website.
cd.. then cd./Backend/ come to backend folder.
npm init - command to create package.json file
entry point: index.js if you want the main file name to be index.
npm install express mongoose dotenv nodemon - install necessary dependencies
Copy paste hello world program from expressjs website.
bcryptjs install for securing password
All changes shall be visible in package.json file.
under scripts, write start: nodemon command to activate npm start.
npm start - run the server.
ctrl + c then y - close the server.

standardize the program, hence secure port number and use import instead of require. for this create .env file and add type: module in package.json file
*/
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import path from "path";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

//const app = express();
dotenv.config();
app.use(express.json());
//middleware, parse json received from postman
//using cookieparser for jwt access in secureRoute.js
app.use(cookieParser());
app.use(cors());
//cors - connection between frontend and backend
const PORT = process.env.PORT || 3001; // use port 3001 if PORT 3000 is busy
//http://localhost:3000/. close (ctrl c) and re run npm start to see any changes, install nodemon if you don't want to do this everytime. package json file has everything.
const URI = process.env.MONGODB_URI;
try{
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} 
catch (error) {
console.log(error);
}
//use cloud database - mongodb atlas website. make necessary changes in .env file. controller, models, routes folders.
//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// ------------------------ code for deployment -------------------------------

if (process.env.NODE_ENV==='production'){
  const dirPath = path.resolve();

  app.use(express.static("./Frontend/dist"));
  app.get("*", (req,res) =>{
    res.sendFile(path.resolve(dirPath, "./Frontend/dist", "index.html"));
  })
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//for user data, go to postman api website, save data in models folder in backend folder.

//http://localhost:3000/user/signup . test it on postman api

//run 2 frontends/2 login accounts on 2 different chrome profiles like one on Rishabh and second on guest user.

