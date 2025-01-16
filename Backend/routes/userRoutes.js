const express = require('express')
const router = express.Router()

const {
    signUp,
    login,
    verifyUserEmail,
    changePassword,
    changePasswordOnLogin,
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
} = require('../controllers/userController')

router.route('/signUp').post(signUp)
router.route('/login').post(login)

router.post('/verifyUserEmail', verifyUserEmail)
router.post('/changePassword', changePassword)
router.post('/changePasswordOnLogin', verifyUser, changePasswordOnLogin)
router.get('/getUsers', verifyUser, getUsers)
router.delete('/deleteUsers', verifyUser, deleteUsers)
router.post('/addToCart', verifyUser, addToCart)
router.post('/removeFromCart', verifyUser, removeFromCart)
router.post('/removeAllCart', verifyUser, removeAllCart)
router.post('/addSavedItem', verifyUser, addSavedItem)
router.post('/removeSavedItem', verifyUser, removeSavedItem)
router.post('/getCart', verifyUser, getCart)
router.get('/getSavedItems', verifyUser, getSavedItems)

module.exports = router