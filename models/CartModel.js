const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    products:[
        {
            product:{
                type: mongoose.Types.ObjectId,
                ref: "product"
            },
            quantity: {
                type: Number,
                default: 0
            },
        },
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
} );

module.exports = mongoose.model("cart", CartSchema);