const router = require('express').Router();
const BrandController = require('../controllers/BrandController');
const ValidateTokenMiddleware = require('../middlewares/ValidateTokenMiddleware');

module.exports = {
    getAll,
    getBrand,
    addBrand,
    updateBrand,
    deleteBrand
} = BrandController;


router.get('/all', ValidateTokenMiddleware, getAll);
router.get('/:id', ValidateTokenMiddleware, getBrand);
router.post('/add', ValidateTokenMiddleware, addBrand);
router.put('/update', ValidateTokenMiddleware, updateBrand);
router.delete('/delete', ValidateTokenMiddleware, deleteBrand);


module.exports = router;