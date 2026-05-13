const User = require('../models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transporter = require('../config/mail')


const generateToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }  
    )
}


//User Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please fill all fields.'
            })
        }

        // Check existing user
        const userExists = await User.findOne({email})

        if (userExists) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // Success response
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: 'User registered successfully!'
        })

        console.log(User)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//User Logging
const loginUser = async (req, res) => {
    try{
        const{email, password} = req.body
        //Validation
        if(!email || !password){
            return res.status(400).json({
                message: 'Please fill all fields'
            })
        }

        // Find User
        const user = await User.findOne({email})

        // Check if user exists
        if(!user){
            return res.status(400).json({
                message: "User has not registered"
            })
        }

        // Compare passwords
        const isMatch  = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        // Success response
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: "Login Successful!"
        })


    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }

}

//TEST email
const testMail = async (req, res) => {
    try{
        await transporter.sendMail({

            from: process.env.EMAIL_USER,
            to: 'shivateja2303@gmail.com',

            subject: "AURA Test Email",

            text: "Your email system is working successfully"
        })

        res.status(200).json({
            message: "Test email sent successfully"
        })
    }catch(error){

        res.status(400).json({
            message: error.message
        })
    }
}

//Forget Password
const forgotPassword = async (req, res) => { 

    try{

        const {email} = req.body
        //Check email exist
        if(!email){
            return res.status(400).json({
                message: "Please provide email"
            })
        }

        //Find user
        const user = await User.findOne({email})
        console.log(user)

        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }

        //Generate 6 digit OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString()
        

        //Store otp in DB
        user.resetOtp = otp

        //Expiry: 5 minutes
        user.resetOtpExpire = 
            Date.now() + 5 * 60 * 1000
        
        await user.save()

        // Send Email
        await transporter.sendMail({

            from: process.env.EMAIL_USER,
            to: user.email,

            subject: `AURA-Shopping Verification Code: ${otp}`,

            text:  
            `Hi there,

            Use the following One-Time Password (OTP) to verify your account. This code is valid for the next 5 minutes.

            Your Verification Code:

            ${otp}

            For security reasons, do not share this code with anyone. Employees of AURA-Shopping will never ask for this code.

            If you did not request this verification, you can safely ignore this email.

            Best regards,
            The AURA-Shopping Team`
        })

        res.status(200).json({
            message: "OTP sent successfully"
        })

    }catch(error){

        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    registerUser,
    loginUser,
    testMail,
    forgotPassword
}