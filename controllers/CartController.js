const asyncHandler = require('express-async-handler');
const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');
const statusCodes = require('../helpers/statusCodes');


const getCart = asyncHandler(async (req, res)=>{
    const userId = req.user.id;
    const populateOptions = {
        path: 'products.product',
        select: 'productTitle productPrice'
    }
    let cart = await CartModel.findOne({user: userId}).populate(populateOptions) || null;  // add populate here and calc total cose
    
    if(cart != null){
        // Calc the total cose of that cart
        let totalCost = 0;
        for (const item of cart.products) {
            totalCost += item.product.productPrice * item.quantity;
        }
        const cartData = cart.toObject();
        cartData.cost = Number(totalCost.toFixed());
        res.status(statusCodes.OK).json(cartData);
    }else{
        res.status(statusCodes.NOT_FOUND).json({msg: "This user's cart is empty, add any product to create him a cart."});
    }

});

const createNewCart = async(userId)=>{
    const newCart = {
        user : userId,
        products : []
    };

    return await CartModel.create(newCart);
}

const addToCart = asyncHandler(async (req, res)=>{
    const userId = req.user.id;
    const {product} = req.body;
    let userCart = await CartModel.findOne({user: userId}) || null;
    const foundProduct = await ProductModel.findOne({_id: product.productId}) || null;
    
    // check that this product is exist
    if(foundProduct == null){
        res.status(statusCodes.NOT_FOUND);
        throw new Error("Not found product.");
    }

    // if user does not have a cart, creata him a new one
    if(userCart == null) userCart = await createNewCart(userId);

    // Appending this product to the cart
    let found = false;
    userCart.products.forEach(element => {
        if(element.product.toString() == product.productId){
            element.quantity += product.quantity;
            found = true;
        }
            
    });

    if(! found){
        product.product = product.productId
        userCart.products.push(product);
    }

    const updatedCart = await CartModel.findByIdAndUpdate(userCart._id, {products : userCart.products}, {new: true});
    res.status(statusCodes.UPDATED).json(updatedCart);
});

const deleteFromCart = asyncHandler(async (req, res)=>{
    const userId = req.user.id;
    const {productId} = req.body;
    const userCart = await CartModel.findOne({user: userId}) || null;
    
    if(userCart == null){
        throw new Error("Cart is empty");
    }

    // removing this product from the cart
    const filteredProducts = userCart.products.filter(item => item.product.toString() !== productId);
    const newCart = await CartModel.findByIdAndUpdate(userCart._id, {products : filteredProducts}, {new: true});
    res.status(statusCodes.UPDATED).json(newCart);
});


module.exports = {
    getCart,
    addToCart,
    deleteFromCart
}