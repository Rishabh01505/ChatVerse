import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../JWT/generateToken.js";
//exporting a function to be routed with 2 parameters request and response. async and await to synchronize the process.
export const signup=async(req,res)=>
{
    //as we selected Post->Body->raw on postman api.
    const {fullname, email, password, confirmPassword} = req.body;

    //try-catch block as whole process may generate an error
    try{

    //to check if passwords match
    if(password!==confirmPassword)
        {
            return res.status(400).json({error:"Passwords do not match"});
        }
    //invalid data shows 400 status

    //finding a user through emailname
    const user = await User.findOne({email});

    //if user already exists
    if (user)
        {
            return res.status(400).json({error:"User already registered"});
        }

    //Hashing the password (encrypted visibility on mongodb website) using bcrypt. pass any value in place of 10
    const hashPassword = await bcrypt.hash(password, 10);

    //to create new user
    const newUser= await new User ({
        fullname,
        email,
        password: hashPassword,
    });
    await newUser.save();

    //for jwt, object id is generated on mongodb website
    if(newUser)
    {
        createTokenAndSaveCookie(newUser._id,res);
        res.status(201).json({message:"User created successfully", user: {
            _id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email
        },
    });
        // 201 or 200 success status code
    }

    } catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
        //500 internal server error
    }

};

export const login= async(req, res) => {
    const {email, password}=req.body;
    try {
        const user=await User.findOne({email});
        const isMatch=await bcrypt.compare(password, user.password);
        if (!user||!isMatch)
            {
                return res.status(400).json({error:"Invalid user credentials"});
            }
            createTokenAndSaveCookie(user._id, res);
            res.status(201).json({message:"User logged in successfully",user: {
                _id:user._id,
                fullname:user.fullname,
                email:user.email,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
};

export const logout=async(req,res)=>{
    try{
        res.clearCookie("jwt");
        res.status(201).json({message:"User logged out successfully"});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
}
};

//get all users from mongodb to see in left pane. used select as we don't want to see passwords on postman
//since we don't want to see logged in user in the list, we use loggedinuser and $ne _id
//we create middleware folder/secureRoute.js, to get the jwt for the logged in user to be identified here (req.user._id)
export const allUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUser},}).select("-password");
         res.status(201).json(filteredUsers);
    }
    catch (error) {
    console.log("Error in allUsers Controller: " + error);
    }
    };
