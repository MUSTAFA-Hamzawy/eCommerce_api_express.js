const router = require('express').Router();
const SearchController = require('../controllers/SearchController');

module.exports = {
    findBrands,
    findCategories,
    findProductsByFilters
} = SearchController;



router.get('/product', findProductsByFilters);
router.get('/brand', findBrands);
router.get('/category', findCategories);



module.exports = router;