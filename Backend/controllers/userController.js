import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const signUp = async (req, res) => {
    const check = await User.findOne({ email: req.body.email });

    let cart = {};
    for (let i = 0; i < 1200; i++) {
        cart[i] = 0;
    }

    let savedItem = {};
    for (let i = 0; i < 1200; i++) {
        savedItem[i] = 0;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (check) {
        res.json({
            success: false,
            error: "User with this Email address already exist"
        });
    } else {
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
            DeliveryAddress: req.body.address,
            savedItem: savedItem
        });
    }
    res.json({
        success: true,
        message: "Registration Successful. Click on OK to Continue"
    });
};

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
};

const verifyUserEmail = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'This Email Address is not registered!'
        });
    } else {
        return res.status(200).json({
            success: true,
            message: 'User Verified!'
        });
    }
};

const changePassword = async (req, res) => {
    const { email, password1, password2 } = req.body;

    const NewHashedPassword = await bcrypt.hash(password1, 10);

    if (password1 === password2) {
        await User.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    password: NewHashedPassword
                }
            },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: 'Password Updated Successfully',
        });
        console.log(email, NewHashedPassword);
    } else {
        res.status(400).json({
            success: false,
            message: 'Password does not match!',
        });
    }
};

const changePasswordOnLogin = async (req, res) => {
    const { currentPassword, password1, password2 } = req.body;

    const NewHashedPassword = await bcrypt.hash(password1, 10);

    const user = await User.findOne({ _id: req.user.id });

    const comparePassword = await bcrypt.compare(currentPassword, user.password);

    if (!comparePassword) {
        res.status(400).json({
            success: false,
            error: 'Incorrect User Password!',
        });
    } else {
        if (password1 === password2) {
            await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $set: {
                        password: NewHashedPassword
                    }
                },
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: 'Password Updated Successfully',
            });
            console.log(user.email, NewHashedPassword);
        } else {
            res.status(400).json({
                success: false,
                message: 'Password does not match!',
            });
        }
    }
};

const verifyUser = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        res.json({
            success: false,
            error: "Please authenticate before proceeding"
        });
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
};

const getUsers = async (req, res) => {
    const currentUser = await User.findOne({ _id: req.user.id });
    res.json(currentUser);
};

const deleteUsers = async (req, res) => {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({
        success: true,
        message: 'Your Account has been deleted successfully!'
    });
};

const addToCart = async (req, res) => {
    let userCart = await User.findOne({ _id: req.user.id });
    userCart.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userCart.cartData });
    res.send("Added");
};

const removeFromCart = async (req, res) => {
    let userCart = await User.findOne({ _id: req.user.id });
    if (userCart.cartData[req.body.itemId] > 0)
        userCart.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userCart.cartData });
    res.send("Removed");
};

const removeAllCart = async (req, res) => {
    let userCart = await User.findOne({ _id: req.user.id });
    if (userCart.cartData[req.body.itemId] > 0)
        userCart.cartData[req.body.itemId] = 0;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userCart.cartData });
    res.send("Removed");
};

const addSavedItem = async (req, res) => {
    let userCart = await User.findOne({ _id: req.user.id });
    userCart.savedItem[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { savedItem: userCart.savedItem });
    res.send("Added");
};

const removeSavedItem = async (req, res) => {
    let userCart = await User.findOne({ _id: req.user.id });
    if (userCart.savedItem[req.body.itemId] > 0)
        userCart.savedItem[req.body.itemId] -= 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { savedItem: userCart.savedItem });
    res.send("Removed");
};

const getCart = async (req, res) => {
    let userCart = await User.findOne({ _id: req.user.id });
    const loggedOutCartItem = req.body.loggedOutCartItem;
    const cartItem = userCart.cartData;

    for (let key in loggedOutCartItem) {
        if (cartItem.hasOwnProperty(key)) {
            cartItem[key] += loggedOutCartItem[key];
        } else {
            cartItem[key] = loggedOutCartItem[key];
        }
    }

    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: cartItem });
    res.json(cartItem);
};

const getSavedItems = async (req, res) => {
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId });
    res.json(user.savedItem);
};

export {
    signUp,
    login,
    verifyUserEmail,
    changePassword,
    changePasswordOnLogin,
    verifyUser,
    getUsers,
    deleteUsers,
    addToCart,
    removeFromCart,
    removeAllCart,
    addSavedItem,
    removeSavedItem,
    getCart,
    getSavedItems
};