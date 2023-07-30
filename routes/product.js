const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const ValidateTokenMiddleware = require('../middlewares/ValidateTokenMiddleware');

module.exports = {
    getAll,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
} = ProductController;


router.get('/all', getAll);
router.get('/:productCode', getProduct);
router.post('/add', ValidateTokenMiddleware, addProduct);
router.put('/update', ValidateTokenMiddleware, updateProduct);
router.delete('/delete', ValidateTokenMiddleware, deleteProduct);


module.exports = router;