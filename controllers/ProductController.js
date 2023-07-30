const asyncHandler = require('express-async-handler');
const ProductModel = require('../models/ProductModel');
const statusCodes = require('../helpers/statusCodes');
const {generateSlug} = require('../helpers/helperMethods');
const CategoryModel = require('../models/CategoryModel');

const getAll = asyncHandler(async (req, res)=>{
    const page = req.query.page;
    if(page < 0 || ! Number.isInteger(Number(page))){
        res.status(statusCodes.NOT_FOUND).json([]);
    }

    const limitPerPage = 15;
    const skipAmount = limitPerPage * (page - 1);
    const products = await ProductModel.find({})
    .skip(skipAmount)
    .limit(limitPerPage);
    res.status(statusCodes.OK).json(products);
});

const getProduct = asyncHandler(async (req, res)=>{
    const productCode = req.params.productCode;
    const populateOptions = {
        path: 'category',
        select: 'categoryName categoryImage'
    }
    const product = await ProductModel.findOne({productCode: productCode}).populate(populateOptions).exec() || {};
    res.status(statusCodes.OK).json(product);
});

const generateProductCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 6;
    let productCode = '';
  
    // Generate a random string of characters
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      productCode += characters.charAt(randomIndex);
    }
  
    // Add a timestamp to ensure uniqueness
    const timestamp = new Date().getTime();
    productCode += timestamp;
  
    return productCode;
  }

const validateProductData = async (data)=>{
    const {productTitle, productImages, productDescription, productPrice, rate, category} = data;
    const errors = {};

    // validate title
    if(! productTitle) errors.productTitle = "Product title is mandatory.";

    // validate images
    if(!productImages || productImages.length == 0) errors.productImages = "Product must have at least one image.";
    
    // validate description
    if(! productDescription) errors.productDescription = "Product must have a description.";

    // validate price
    const numberRegex = /^[0-9]+(\.[0-9]+)?$/;
    if(! productPrice) errors.productPrice = "Product price must be set.";
    else if (! numberRegex.test(productPrice)) errors.productPrice = "Product price must be a number.";

    // validate rate, if exist
    if(rate && !numberRegex.test(rate)) errors.rate = "Product rate must be a number.";
    else if(Number(rate) > 5 || Number(rate) < 0) errors.rate = "rate value is invalid, must be between 0 & 5"
    // validate the given category
    if(! category) errors.category = "Product Category is required.";
    else if(await CategoryModel.findOne({_id: category}) == null)
        errors.category = "Category is not found.";

    return Object.keys(errors).length > 0 ? errors : 0;
}

const addProduct = asyncHandler(async (req, res)=>{
    const errors = await validateProductData(req.body);
    if(errors != 0){
        res.status(statusCodes.VALIDATION_ERROR);
        throw new Error(JSON.stringify(errors));
    }

    // add random unique code to represent that product
    req.body.productCode = generateProductCode();

    try {
        console.log(req.body);
        const product = await ProductModel.create(req.body);
        res.status(statusCodes.CREATED).json(product);
    } catch (error) {
        console.error('Error inserting product:', error);
    }

});

const validateUpdateProductData = async (data)=>{
    const {productTitle, productCode, isAvailable, productImages, productDescription, productPrice, rate, category} = data;
    const errors = {};

    // validate product code
    if(productCode) errors.productCode = "Product code can't be changed, it is auto-generated.";

    // check type of isAvailable
    if(isAvailable && typeof isAvailable != "boolean") errors.isAvailable = "This must be true or false, nothing else is accepted.";

    // validate title
    if(productTitle && productTitle == "") errors.productTitle = "Product title is mandatory.";

    // validate images
    if(productImages && productImages.length == 0) errors.productImages = "Product must have at least one image.";
    
    // validate description
    if(productDescription && productDescription == "") errors.productDescription = "Product must have a description.";

    // validate price
    const numberRegex = /^[0-9]+(\.[0-9]+)?$/;
    if (productPrice && ! numberRegex.test(productPrice)) errors.productPrice = "Product price must be a number.";

    // validate rate, if exist
    if(rate && !numberRegex.test(rate)) errors.rate = "Product rate must be a number.";
    else if(rate && (Number(rate) > 5 || Number(rate) < 0)) errors.rate = "rate value is invalid, must be between 0 & 5"

    // validate the given category
    else if(category && await CategoryModel.findOne({_id: category}) == null)
        errors.category = "Category is not found.";

    return Object.keys(errors).length > 0 ? errors : 0;
}

const updateProduct = asyncHandler(async (req, res)=>{
    const _id = req.query.id;
    const found = await ProductModel.findOne({_id}) || false;
    if(!found){
        res.status(statusCodes.NOT_FOUND);
        throw new Error("This proudct is not found.");
    }

    const errors = await validateUpdateProductData(req.body);
    if(errors != 0){
        res.status(statusCodes.VALIDATION_ERROR);
        throw new Error(JSON.stringify(errors));
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
        _id,
        req.body,
        {
            new : true
        }
    );
    res.status(statusCodes.UPDATED).json(updatedProduct);
    
});


const deleteProduct = asyncHandler(async (req, res)=>{

    const _id = req.query.id;
    const deleted = await ProductModel.findByIdAndRemove({_id});

    if(deleted)
        res.status(statusCodes.OK).json({deleted: 1});
    else 
        res.status(statusCodes.OK).json({deleted: 0});

});


module.exports = {
    getAll,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}