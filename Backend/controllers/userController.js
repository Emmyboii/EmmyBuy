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
        message: "Registration Successful. Click on OK to Continue"
    })

}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                success: false,
                error: "No user found for this email/password. Check the email or password again."
            });
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.status(400).json({
                success: false,
                error: "No user found for this email/password. Check the email or password again."
            });
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({
            success: false,
            error: "An error occurred during login. Please try again later."
        });
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

const deleteUsers = async (req, res) => {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({
        success: true,
        message: 'Your Account has been deleted successfully!'
    });
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

const removeAllCart = async (req, res) => {
    let userCart = await User.findOne({ _id: req.user.id })
    if (userCart.cartData[req.body.itemId] > 0)
        userCart.cartData[req.body.itemId] = 0
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

const getSavedItems = async (req, res) => {
    const userId = req.user.id; // Get user from token

    // Find the user and return the cart data
    const user = await User.findOne({ _id: userId });
    res.json(user.savedItem); // Return the user's cart data
}

const syncGuestCart  = async (req, res) => {
    const userId = req.user.id; // Get user from token
    const guestItems = req.body.items; // Guest items from request

    // Find the logged-in user
    const user = await User.findOne({ _id: userId });

    // Merge guest items into the user's cartData
    for (let itemId in guestItems) {
        user.cartData[itemId] = (user.cartData[itemId] || 0) + guestItems[itemId];
    }

    // Save updated cart data
    await user.save();

    // Respond with success
    res.json({ success: true });
}

const syncGuestSavedItems = async (req, res) => {
    const userId = req.user.id; // Get user from token
    const guestSavedItems = req.body.items; // Guest saved items from request
  
    const user = await User.findOne({ _id: userId });
    for (let itemId in guestSavedItems) {
      user.savedItems[itemId] = (user.savedItems[itemId] || 0) + guestSavedItems[itemId];
    }
  
    await user.save();
    res.json({ success: true });
  };

module.exports = {
    signUp,
    login,
    verifyUser,
    getUsers,
    deleteUsers,
    addToCart,
    removeFromCart,
    removeAllCart,
    addSavedItem,
    removeSavedItem,
    getCart,
    getSavedItems,
    syncGuestCart,
    syncGuestSavedItems
}