const asyncHandler = require('express-async-handler');
const ProductModel = require('../models/ProductModel');
const BrandModel = require('../models/BrandModel');
const CategoryModel = require('../models/CategoryModel');
const statusCodes = require('../helpers/statusCodes');
const {generateSlug} = require('../helpers/helperMethods');

const preProcessQuery = (query)=>{
    const pattern = /[^\w\s]/gi;    // to get any special chars
    return query.replace(pattern, '').trim();
}

const findProductsByFilters = asyncHandler(async (req, res)=>{
    const {query, date, rate, price, page} = req.query;
    const searchQuery = preProcessQuery(query);
    const limitPerPage = 10 ;
    const skipAmount = limitPerPage * (page - 1);
    let finalQuery = {$text: {$search: query}};
    
    // rate filter
    if(rate && !isNaN(rate) && (Number(rate) >= 0 && Number(rate) <= 5)) finalQuery.rate = {$gt: parseFloat(rate)};

    // date filter
    if(date) finalQuery.createdAt = {$gt: date};

    // price filter
    if(price) finalQuery.productPrice = {$lt: parseFloat(price)};

    const result = await ProductModel.find(finalQuery)
    .skip(skipAmount)
    .limit(limitPerPage) || {};
    res.status(statusCodes.OK).json(result);
});

const findBrands = asyncHandler(async (req, res)=>{
    const searchQuery = preProcessQuery(req.query.query);
    const slug = generateSlug(searchQuery);
    const result = await BrandModel.find({ $text: { $search: slug } }) || {};
    res.status(statusCodes.OK).json(result);

});

const findCategories = asyncHandler(async (req, res)=>{
    const searchQuery = preProcessQuery(req.query.query);
    const slug = generateSlug(searchQuery);
    const result = await CategoryModel.find({ $text: { $search: slug } }) || {};
    res.status(statusCodes.OK).json(result);
});




module.exports = {
    findBrands,
    findCategories,
    findProductsByFilters
}