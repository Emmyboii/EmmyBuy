import Product from '../models/productModel.js';

const addProduct = async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
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
    });
    console.log(product);
    await product.save();
    res.send({
        success: 1,
        id: product.id,
        Name: product.Name,
        Image: product.Image
    });
};

const deleteProduct = async (req, res) => {
    const products = await Product.findOneAndDelete({ id: req.body.id });
    res.json(products);
};

const updateProduct = async (req, res) => {
    const { id, Name, Old_price, New_price, Items_left, Image } = req.body;

    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { id: id },
            {
                $set: {
                    Name: Name,
                    New_price: New_price,
                    Old_price: Old_price,
                    Items_left: Items_left,
                    Image: Image
                }
            },
            { new: true }
        );

        res.status(200).json({ success: true, message: 'Product Updated Successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

const todayDealHome = async (req, res) => {
    const products = await Product.find({ Old_price: { $ne: null } });
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
    res.json(shuffledItems);
};

const recentlyAddedHome = async (req, res) => {
    const products = await Product.find({});
    const productNew = products.slice(-11);
    res.json(productNew);
};

const reommendedHome = async (req, res) => {
    const products = await Product.find({ Old_price: { $ne: null } });
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
    res.json(shuffledItems);
};

const allproducts = async (req, res) => {
    const product = await Product.find({});

    const shuffleArray = (array) => {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const shuffledItems = shuffleArray(product);
    res.send(shuffledItems);
};

const allproduct = async (req, res) => {
    const product = await Product.find({});
    res.send(product);
};

const productById = async (req, res) => {
    const product = await Product.findOne(
        { id: req.body.id },
        { Name: 1, Old_price: 1, New_price: 1, Items_left: 1, Image: 1 }
    );
    res.send(product);
};

const update = async (req, res) => {
    const product = await Product.updateMany(
        { Category: "Phone" },
        { $set: { Category: "Phone & Accessories" } }
    );
    res.json(product);
};

export {
    addProduct,
    recentlyAddedHome,
    reommendedHome,
    todayDealHome,
    update,
    allproducts,
    allproduct,
    productById,
    deleteProduct,
    updateProduct
};
