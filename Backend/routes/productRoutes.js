import express from 'express';
const router = express.Router();

import {
    addProduct,
    recentlyAddedHome,
    reommendedHome,
    todayDealHome,
    allproducts,
    allproduct,
    productById,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

// router.route('/addproduct').post(addProduct);

router.post("/addproduct", addProduct);
router.get("/todayDealHome", todayDealHome);
router.get("/recentlyAddedHome", recentlyAddedHome);
router.get("/reommendedHome", reommendedHome);
router.get("/allproducts", allproducts);
router.post("/productById", productById);
router.get("/allproduct", allproduct);
router.post("/updateProduct", updateProduct);
router.delete("/deleteProduct", deleteProduct);

export default router;