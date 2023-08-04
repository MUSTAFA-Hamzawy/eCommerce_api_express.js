const asyncHandler = require('express-async-handler');
const OrderModel = require('../models/OrderModel');
const statusCodes = require('../helpers/statusCodes');

const getAll = asyncHandler(async (req, res)=>{
    const userId = req.user.id;
    res.status(statusCodes.OK).json(await OrderModel.find({user: userId}));
});


const validateOrderData = ({items, paymentMethod, shippingAddress, totalPrice})=>{
    const errors = {};

    // items
    if(!items || items.length == 0) errors.items = "Items can not be empty";  
    
    // payment
    if(!paymentMethod) errors.paymentMethod = "Payment Method is required";
    
    // price
    if(!totalPrice) errors.totalPrice = "Total Price is required";   

    // address
    if(!shippingAddress) errors.shippingAddress = "Shipping Address can not be empty";
    else if(!shippingAddress.country) errors.shippingAddress = "Country is required .";
    else if(!shippingAddress.street) errors.shippingAddress = "Street is required .";
    else if(!shippingAddress.city) errors.shippingAddress = "City is required .";
    else if(!shippingAddress.postalCode) errors.shippingAddress = "Postal Code is required .";
    
    return Object.keys(errors).length > 0 ? errors : 0;
}

const addOrder = asyncHandler(async (req, res)=>{
    const userId = req.user.id;
    const errors = validateOrderData(req.body);

    // validation
    if(errors != 0){
        res.status(statusCodes.VALIDATION_ERROR);
        throw new Error(JSON.stringify(errors));
    }

    // TODO: reducing the quanitiy of the ordered products

    // create order
    const orderBody = {
        user: userId,
        items: req.body.items,
        totalPrice : req.body.totalPrice,
        paymentMethod: req.body.paymentMethod,
        shippingAddress : req.body.shippingAddress
    };

    const order = await OrderModel.create(orderBody);
    res.status(statusCodes.CREATED);
    res.json(order);

});

// To update only the status of the order
const updateOrder = asyncHandler(async (req, res)=>{

    const orderId = req.body.orderId;
    const status = req.body.status;

    // TODO: if sattus is cancelled, add quantity to the products
    if(orderId && status){
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            {status},
            {new: true} // to return the new data
        );
    
        res.status(statusCodes.UPDATED).json(updatedOrder);
    }else{
        res.status(statusCodes.NOT_FOUND);
        throw new Error("Error, make sure the body data is valid.");
    }

});



module.exports = {
    getAll,
    addOrder,
    updateOrder,
}