const Product = require('../models/productModel')

const addProduct = async (req, res) => {
    let products = await Product.find({})
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id + 1
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        Name: req.body.Name,
        Brand: req.body.Brand,
        New_price: req.body.New_price,
        Old_price: req.body.Old_price,
        Image: req.body.Image,
        Category: req.body.Category,
        Mini_Category: req.body.Mini_Category,
        Sub_Category: req.body.Sub_Category,
        Items_left: req.body.Items_left
    })
    console.log(product);
    await product.save()
    res.send({
        id: product.id,
        Name: product.Name,
        Image: product.Image
    })
}

module.exports = {
    addProduct
}