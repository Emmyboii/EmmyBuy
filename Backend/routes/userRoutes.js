const express = require('express')
const router = express.Router()

const {
    signUp,
    login,
    getUsers,
    deleteUsers,
    verifyUser,
    addToCart,
    removeFromCart,
    removeAllCart,
    addSavedItem,
    removeSavedItem,
    getCart,
    getSavedItems,
    syncGuestCart,
    syncGuestSavedItems
} = require('../controllers/userController')

router.route('/signUp').post(signUp)
router.route('/login').post(login)

router.get('/getUsers', verifyUser, getUsers)
router.delete('/deleteUsers', verifyUser, deleteUsers)
router.post('/addToCart', verifyUser, addToCart)
router.post('/removeFromCart', verifyUser, removeFromCart)
router.post('/removeAllCart', verifyUser, removeAllCart)
router.post('/addSavedItem', verifyUser, addSavedItem)
router.post('/removeSavedItem', verifyUser, removeSavedItem)
router.get('/getCart', verifyUser, getCart)
router.get('/getSavedItems', verifyUser, getSavedItems)
router.get('/syncGuestCart', verifyUser, syncGuestCart)
router.get('/syncGuestSavedItems', verifyUser, syncGuestSavedItems)

module.exports = router