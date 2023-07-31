const router = require('express').Router();
const CartController = require('../controllers/CartController');
const ValidateTokenMiddleware = require('../middlewares/ValidateTokenMiddleware');

module.exports = {
    getCart,
    addToCart,
    deleteFromCart
} = CartController;

router.use(ValidateTokenMiddleware);
router.get('/:userId', getCart);
router.post('/addToCart', addToCart);
router.put('/deleteFromCart', deleteFromCart);


module.exports = router;