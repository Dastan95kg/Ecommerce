const express = require('express')
const router = express.Router()

// middlewares
const { authCheck } = require('../middlewares/auth')

// controller
const { createPaymentIntent } = require('../controllers/stripe')

// routes
router.post('/create-payment-intent', authCheck, createPaymentIntent)

module.exports = router