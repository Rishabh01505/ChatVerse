import mongoose from "mongoose";

//define schema from postman api
const userSchema=mongoose.Schema({

    fullname: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    },
    confirmPassword: {
        type:String,
    }
}, {timestamps:true}); //user createdAt & updatedAt

//convert schema to model

const User = mongoose.model("User", userSchema);
//to use it outside this file

export default User;

//make a controller folder that defines a function that stores data from postman api.