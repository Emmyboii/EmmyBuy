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
        success: 1,
        id: product.id,
        Name: product.Name,
        Image: product.Image
    })
}

const todayDealHome = async (req, res) => {
    const products = await Product.find({ Old_price: { $ne: null } })
    const shuffleArray = (array, count) => {
        const filteredArray = array.filter(item => item.Items_left < 50);

        const shuffled = [...filteredArray];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled.slice(0, count);
    };

    const shuffledItems = shuffleArray(products, 11);
    res.json(shuffledItems)
}

const recentlyAddedHome = async (req, res) => {
    const products = await Product.find({})
    const productNew = products.slice(-11)
    res.json(productNew)
}

const reommendedHome = async (req, res) => {
    const products = await Product.find({ Old_price: { $ne: null } })
    const shuffleArray = (array, count) => {
        const filteredArray = array.filter(item => item.Items_left < 50);

        const shuffled = [...filteredArray];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled.slice(0, count);
    };

    const shuffledItems = shuffleArray(products, 11);
    res.json(shuffledItems)
}

const allproducts = async (req, res) => {
    const product = await Product.find({})

    const shuffleArray = (array) => {
        let shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
    }
    const shuffledItems = shuffleArray(product)
    res.send(shuffledItems)
}

const update = async (req, res) => {
    const product = await Product.updateMany(
        { Category: "Phone" },
        { $set: { Category: "Phone & Accessories" } }
    )
    res.json(product)
}

module.exports = {
    addProduct,
    recentlyAddedHome,
    reommendedHome,
    todayDealHome,
    update,
    allproducts
}