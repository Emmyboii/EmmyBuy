const mongoose = require('mongoose')

const User = mongoose.model('User',
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        cartData: {
            type: Object,
        },
        savedItem: {
            type: Object,
        },
        DeliveryAddress: {
            type: String
        },
        Date: {
            type: Date,
            Default: Date.now
        }
    }
)

module.exports = User