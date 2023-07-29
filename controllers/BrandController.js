const asyncHandler = require('express-async-handler');
const BrandModel = require('../models/BrandModel');
const statusCodes = require('../helpers/statusCodes');
const {generateSlug} = require('../helpers/helperMethods');

const getAll = asyncHandler(async (req, res)=>{
    res.status(statusCodes.OK).json(await BrandModel.find());
});

const getBrand = asyncHandler(async (req, res)=>{
    const _id = req.params.id;
    const brand = await BrandModel.findOne({_id}) || {};

    if(brand) res.status(statusCodes.OK).json(brand);
});

const addBrand = asyncHandler(async (req, res)=>{
    const {brandName, brandImage} = req.body;
    if(!brandName){
        res.status(statusCodes.VALIDATION_ERROR);
        throw new Error("Brand Name is required.");
    }
    const brandSlug = generateSlug(brandName);

    const isDuplicated = await BrandModel.findOne({brandName}) || null;
    if(! isDuplicated){
        const brand = await BrandModel.create({brandName, brandSlug, brandImage});
        return res.status(statusCodes.CREATED).json(brand);
    }else{
        res.status(statusCodes.VALIDATION_ERROR);
        throw new Error("Brand is already exist.");
    }

});

const updateBrand = asyncHandler(async (req, res)=>{
    const _id = req.query.id;
    const {brandName, brandImage} = req.body;
    const updateBody = {};

    if(brandName){
        updateBody.brandSlug = generateSlug(brandName);
        updateBody.brandName = brandName;
    }

    if(brandImage) updateBody.brandImage = brandImage;


    const updatedBrand = await BrandModel.findByIdAndUpdate(
        _id,
        updateBody,
        {new: true} // to return the new data
    );

    res.status(statusCodes.UPDATED).json(updatedBrand);
});


const deleteBrand = asyncHandler(async (req, res)=>{
    const _id = req.query.id;
    const deleted = await BrandModel.findByIdAndRemove({_id});
    
    if(deleted)
        res.status(statusCodes.OK).json({deleted: 1})
    else
        res.status(statusCodes.OK).json({deleted: 0})

});


module.exports = {
    getAll,
    getBrand,
    addBrand,
    updateBrand,
    deleteBrand
}