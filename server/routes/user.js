const express = require('express')

const router = express.Router()

// middlewares
const { authCheck } = require('../middlewares/auth')
// controllers
const { userCart, getUserCart, emptyCart, saveAddress, applyCouponToUserCart, createOrder, orders } = require("../controllers/user")

router.post("/user/cart", authCheck, userCart) // save cart
router.get("/user/cart", authCheck, getUserCart)
router.delete('/user/cart', authCheck, emptyCart)
router.post('/user/address', authCheck, saveAddress)

// coupon
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart)

// order
router.post('/user/order', authCheck, createOrder)
router.get('/user/orders', authCheck, orders)

// router.get('/user', (req, res) => {
//     res.json({
//         data: 'hey you hit user API endpoint',
//     })
// }) 

module.exports = router