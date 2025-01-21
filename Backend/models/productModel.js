import mongoose from 'mongoose';

const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Brand: {
        type: String,
    },
    New_price: {
        type: Number,
        required: true,
    },
    Old_price: {
        type: Number,
    },
    Image: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    Mini_Category: {
        type: String,
    },
    Sub_Category: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    Items_left: {
        type: Number,
        required: true,
    }
});

export default Product;
