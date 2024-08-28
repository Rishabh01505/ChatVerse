import jwt from "jsonwebtoken";
/*
install json web token - npm i jsonwebtoken
*/

/*open in gitbash and generate a random value -
openssl rand -base64 32
ibgQvd3oCFSAu+0Q96JFgFVI+fhliJYHI4k9iH8gais=
paste this in env file
*/
const createTokenAndSaveCookie=(userId, res)=>{
    const token=jwt.sign({userId}, process.env.JWT_TOKEN, {expiresIn:"10d",});

    res.cookie("jwt", token, {
        httpOnly:true,//secure from xss attack
        secure:true,
        sameSite:"strict", //secure from csrf attack
    });
};

export default createTokenAndSaveCookie;