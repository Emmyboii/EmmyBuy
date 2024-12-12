const express = require('express')
const router = express.Router()

const {
    addProduct,
    recentlyAddedHome,
    reommendedHome,
    todayDealHome,
    allproducts,
    update
} = require('../controllers/productController')


// router.route('/addproduct').post(addProduct)

router.post("/addproduct", addProduct)
router.get("/todayDealHome", todayDealHome)
router.get("/recentlyAddedHome", recentlyAddedHome)
router.get("/reommendedHome", reommendedHome)
router.get("/allproducts", allproducts)
router.put("/update", update)

module.exports = router