const express = require('express')
const router = express.Router()

const {
    addProduct
} = require('../controllers/productController')


// router.route('/addproduct').post(addProduct)

router.post("/addproduct", addProduct)

module.exports = router