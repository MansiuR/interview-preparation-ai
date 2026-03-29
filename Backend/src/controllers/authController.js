import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import tokenBlacklistModel from "../models/blacklistModel.js"
import e from "express"

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
 async function registerUserController(req, res) {
try{
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, {
    httpOnly: true,
    secure: false,       // true only in production (https)
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
})


    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
} catch (err) {
        console.error("REGISTER ERROR:", err)
        res.status(500).json({
            message: "Server error during Register"
        })
    }
}


/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
  async function loginUserController(req, res) {

try{
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

      res.cookie("token", token)

    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
} catch (err) {
        console.error("LOGIN ERROR:", err)
        res.status(500).json({
            message: "Server error during login"
        })
    }
}


/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
 async function logoutUserController(req, res) {
    try{
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
} catch (err) {
        console.error("LOGOUT ERROR:", err)
        res.status(500).json({
            message: "Server error during Logout"
        })
    }
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
 async function getMeController(req, res) {
try{
    const user = await userModel.findById(req.user.id)


    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
} catch (err) {
        console.error("GET-ME ERROR:", err)
        res.status(500).json({
            message: "Server error during Get-me"
        })
    }

}

export default { registerUserController, loginUserController, logoutUserController, getMeController };