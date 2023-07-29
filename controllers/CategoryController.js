const asyncHandler = require('express-async-handler');
const CategoryModel = require('../models/CategoryModel');
const statusCodes = require('../helpers/statusCodes');
const {generateSlug} = require('../helpers/helperMethods');

const getAll = asyncHandler(async (req, res)=>{
    res.status(statusCodes.OK).json(await CategoryModel.find());
});

const getCategory = asyncHandler(async (req, res)=>{
    const _id = req.params.id;
    const category = await CategoryModel.findOne({_id}) || {};

    if(category) res.status(statusCodes.OK).json(category);
});

const addCategory = asyncHandler(async (req, res)=>{
    const {categoryName, categoryImage} = req.body;
    if(!categoryName){
        res.status(statusCodes.VALIDATION_ERROR);
        throw new Error("Category Name is required.");
    }
    const categorySlug = generateSlug(categoryName);

    const isDuplicated = await CategoryModel.findOne({categoryName}) || null;
    if(! isDuplicated){
        const category = await CategoryModel.create({categoryName, categorySlug, categoryImage});
        return res.status(statusCodes.CREATED).json(category);
    }else{
        res.status(statusCodes.VALIDATION_ERROR);
        throw new Error("Category is already exist.");
    }

});

const updateCategory = asyncHandler(async (req, res)=>{
    const _id = req.query.id;
    const {categoryName, categoryImage} = req.body;
    const updateBody = {};

    if(categoryName){
        updateBody.categorySlug = generateSlug(categoryName);
        updateBody.categoryName = categoryName;
    }

    if(categoryImage) updateBody.categoryImage = categoryImage;


    const updatedCategory = await CategoryModel.findByIdAndUpdate(
        _id,
        updateBody,
        {new: true} // to return the new data
    );

    res.status(statusCodes.UPDATED).json(updatedCategory);
});


const deleteCategory = asyncHandler(async (req, res)=>{
    const _id = req.query.id;
    const deleted = await CategoryModel.findByIdAndRemove({_id});
    
    if(deleted)
        res.status(statusCodes.OK).json({deleted: 1})
    else
        res.status(statusCodes.OK).json({deleted: 0})

});


module.exports = {
    getAll,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
}