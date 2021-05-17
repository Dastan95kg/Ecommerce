const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')
const Coupon = require('../models/coupon')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.createPaymentIntent = async (req, res) => {
    // later apply coupon
    // later calculate price
    const { couponApplied } = req.body

    // 1. find user
    const user = await User.findOne({ email: req.user.email }).exec()

    // 2. get user cart total
    const { cartTotal, totalAfterDiscount } = await Cart.findOne({ orderedBy: user._id }).exec()

    console.log('totalAfterDiscount', totalAfterDiscount);

    let finalAmount = 0

    if (couponApplied && totalAfterDiscount) {
        finalAmount = totalAfterDiscount * 100
    } else {
        finalAmount = cartTotal * 100
    }

    console.log('finalAmount', finalAmount);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmount,
        currency: "usd"
    })

    res.send({
        clientSecret: paymentIntent.client_secret,
        cartTotal,
        totalAfterDiscount,
        payable: finalAmount
    })
}