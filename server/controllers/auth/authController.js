const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.js")



// register
const registerUser = async (req,res) => {
    const {userName, email, password} = req.body;

    try {

        const existingUserEmail = await User.findOne({email});
        const existingUserName = await User.findOne({userName})
        if(existingUserEmail || existingUserName) {
            return res.json({
                success : false,
                message : "An account with this email already exists.Please log in or use a different email to register."
            })
        }

        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            userName,
            email,
            password : hashPassword
        })

        await newUser.save();
        res.status(200).json({
            success : true,
            message : "Registration Successfull"
        })

    } catch (error) {
        console.error("Error : " ,error);
        res.status(500).json({
            success : false,
            message : 'Some error occured'

        })
    }

}



// login

const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.json({
                success : false,
                message : "user doesn't exists! Please register first."
            })
        }

        const checkPasswordMatch = await bcrypt.compare(password,existingUser.password);
        if(!checkPasswordMatch) {
           return res.json({
            success : false,
            message : "Invalid Password! Please try with Valid Password"

             })
        }

        const token = jwt.sign({
            id : existingUser._id, role : existingUser.role, email : existingUser.email, userName : existingUser.userName
        },`CLIENT_SECRET_KEY`,{expiresIn : "8h"});


        // res.cookie('token',token,{httpOnly : true, secure : true}).json({
        //     success : true,
        //     message : "Logged In Successfully",
        //     user : {
        //         email : existingUser.email,
        //         role : existingUser.role,
        //         id : existingUser._id,
        //         userName : existingUser.userName
        //     }
        // })
        res.status(200).json({
            success : true,
            message : "logged in Successfull",
            token,
            user : {
                email : existingUser.email,
                role : existingUser.role,
                id : existingUser._id,
                userName : existingUser.userName
            }
        })


        
    } catch (error) {
        console.error("Error : " ,error);
        res.status(500).json({
            success : false,
            message : 'Some error occured'

        })
    }

}


// logout

const logoutUser = (req,res) => {
    res.clearCookie("token").json({
        success : true,
        message : "Logged out successfully"
    })
};



// authMiddleware

// const authMiddleware = async (req,res,next) => {
//     const token = req.cookies.token;
//     if(!token) {
//         return res.status(401).json({
//             success : false,
//             message : "Unauthorized user!"
//         })
//     }
//     try {
//         const decoded = jwt.verify(token,"CLIENT_SECRET_KEY");
//         req.user = decoded;
//         next();
//     }catch(error) {
//         res.status(401).json({
//             success : false,
//             message : 'Unauthorized user!'
//         })
//     }
// };

const authMiddleware = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({
            success : false,
            message : "Unauthorized user!"
        })
    }
    try {
        const decoded = jwt.verify(token,"CLIENT_SECRET_KEY");
        req.user = decoded;
        next();
    }catch(error) {
        res.status(401).json({
            success : false,
            message : 'Unauthorized user!'
        })
    }
};


module.exports = { registerUser, loginUser, logoutUser, authMiddleware };