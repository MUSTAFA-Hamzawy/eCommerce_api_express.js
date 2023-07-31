const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    
        productTitle: {
            type: String,
            required: [true, 'Product title is required.']
        },
        productCode: {
            type: String,
        },
        productImages: {
            type: Array,
            required: [true, 'Product image is required.']
        },
        productDescription: {
            type: String,
            required: [true, 'Produce description is required.']
        },
        productPrice: {
            type: Number,
            require: [true, 'Product price is required.']
        },
        isAvailable:{
            type: Boolean,
            default: true
        },
        rate:{
            type: Number
        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Product category is required'],
            ref: 'category'
        }
    

},{
    timestamps: true,
});

ProductSchema.index({productTitle: 'text'});

module.exports = mongoose.model('product', ProductSchema);