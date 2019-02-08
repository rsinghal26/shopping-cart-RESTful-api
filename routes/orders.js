const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const orderController = require("../controllers/orders");


router.get('/', checkAuth, orderController.get_your_orders);

router.get('/:orderId', checkAuth,orderController.get_a_order);

router.post('/', checkAuth, orderController.post_new_order);

router.delete('/:orderId', checkAuth, orderController.delete_order);

module.exports = router;