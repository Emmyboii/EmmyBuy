const express = require('express')
const router = express.Router()

const {
    signUp,
    login,
    getUsers,
    verifyUser,
    addToCart,
    removeFromCart,
    addSavedItem,
    removeSavedItem,
    getCart
} = require('../controllers/userController')

router.route('/signUp').post(signUp)
router.route('/login').post(login)

router.get('/getUsers', verifyUser, getUsers)
router.post('/addToCart', verifyUser, addToCart)
router.post('/removeFromCart', verifyUser, removeFromCart)
router.post('/addSavedItem', verifyUser, addSavedItem)
router.post('/removeSavedItem', verifyUser, removeSavedItem)
router.get('/getCart', verifyUser, getCart)

module.exports = router