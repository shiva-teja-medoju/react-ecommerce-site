const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
     productId: {
        type: Number,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        default: 1
    }
})


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6
        },

        resetOtp: {
            type: String
        },

        resetOtpExpire: {
            type: Date
        },

        cartItems: [cartItemSchema]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)