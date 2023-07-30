const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');
const ValidateTokenMiddleware = require('../middlewares/ValidateTokenMiddleware');

module.exports = {
    getAll,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
} = CategoryController;


router.get('/all', getAll);
router.get('/:id', getCategory);
router.post('/add', ValidateTokenMiddleware, addCategory);
router.put('/update', ValidateTokenMiddleware, updateCategory);
router.delete('/delete', ValidateTokenMiddleware, deleteCategory);


module.exports = router;