const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const signUp = async (req, res) => {
    const check = await User.findOne({ email: req.body.email })

    let cart = {}
    for (let i = 0; i < 1200; i++) {
        cart[i] = 0
    }

    let savedItem = {}
    for (let i = 0; i < 1200; i++) {
        savedItem[i] = 0
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    if (check) {
        res.json({
            success: false,
            error: "User with this Email address already exist"
        })
    } else {
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
            DeliveryAddress: req.body.address,
            savedItem: savedItem
        })
    }
    res.json({
        success: true,
        message: "Registration Successful"
    })

}

const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        res.json({
            success: false,
            error: "No User with this Email address was found"
        })
    } else {
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (comparePassword) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET)
            res.json({
                success: true,
                message: "Login Successful",
                token
            })
        } else {
            res.json({
                success: false,
                error: "Incorrect Password"
            })
        }
    }
}

const verifyUser = async (req, res, next) => {
    const token = req.header('token')
    if (!token) {
        res.json({
            success: false,
            error: "Please authenticate before proceeding"
        })
    }
    try {
        // Verify the token
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = data.user;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            error: "Invalid or expired token"
        });
    }
}

const getUsers = async (req, res) => {
    const currentUser = await User.findOne({ _id: req.user.id })
    res.json(currentUser)
}

const addToCart = async (req, res) => {
    let userCart = await User.findOne({ _id: req.user.id })
    userCart.cartData[req.body.itemId] += 1
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userCart.cartData })
    res.send("Added")
}

const removeFromCart = async (req, res) => {
    let userCart = await User.findOne({ _id: req.user.id })
    if (userCart.cartData[req.body.itemId] > 0)
        userCart.cartData[req.body.itemId] -= 1
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userCart.cartData })
    res.send("Removed")
}

const addSavedItem = async (req, res) => {
    let userCart = await User.findOne({ _id: req.user.id })
    userCart.savedItem[req.body.itemId] += 1
    await User.findOneAndUpdate({ _id: req.user.id }, { savedItem: userCart.savedItem })
    res.send("Added")
}

const removeSavedItem = async (req, res) => {
    let userCart = await User.findOne({ _id: req.user.id })
    if (userCart.savedItem[req.body.itemId] > 0)
        userCart.savedItem[req.body.itemId] -= 1
    await User.findOneAndUpdate({ _id: req.user.id }, { savedItem: userCart.savedItem })
    res.send("Removed")
}

const getCart = async (req, res) => {
    let userCart = await User.findOne({ _id: req.user.id })
    res.json(userCart.cartData)
}

module.exports = {
    signUp,
    login,
    verifyUser,
    getUsers,
    addToCart,
    removeFromCart,
    addSavedItem,
    removeSavedItem,
    getCart
}