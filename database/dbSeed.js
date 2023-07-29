const connectDB = require('../config/connectDB');
const UserModel = require('../models/UserModel');
const BrandModel = require('../models/BrandModel');
const CategoryModel = require('../models/CategoryModel');
require('dotenv').config();
const users = require('../database/userSeed');
const brands = require('../database/brandSeed');
const categories = require('../database/categorySeed');

const usersSeeding = async ()=>{
    UserModel.insertMany(users)
    .then(docs => console.log(`${docs.length} users have been inserted into the database.`))
    .catch(err => {
    console.error(err);
    console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
    });
}

const brandsSeeding = async ()=>{
    BrandModel.insertMany(brands)
    .then(docs => console.log(`${docs.length} brands have been inserted into the database.`))
    .catch(err => {
    console.error(err);
    console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
    });
}

const categoriesSeeding = async ()=>{
    CategoryModel.insertMany(categories)
    .then(docs => console.log(`${docs.length} categories have been inserted into the database.`))
    .catch(err => {
    console.error(err);
    console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
    });
}

if(connectDB()){
    console.log('connected to db.');

    // seeding brands
    usersSeeding();
    brandsSeeding();
    categoriesSeeding();

}