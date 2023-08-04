const router = require('express').Router();
const OrderController = require('../controllers/OrderController');
const ValidateTokenMiddleware = require('../middlewares/ValidateTokenMiddleware');

module.exports = {
    getAll,
    addOrder,
    updateOrder
} = OrderController;

router.get('/userOrders', ValidateTokenMiddleware, getAll);
router.post('/add', ValidateTokenMiddleware, addOrder);
router.put('/update', ValidateTokenMiddleware, updateOrder);


module.exports = router;