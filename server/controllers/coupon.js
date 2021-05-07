const Coupon = require('../models/coupon')

exports.create = async (req, res) => {
    try {
        const { name, expiry, discount } = req.body
        const newCoupon = await new Coupon({ name, expiry, discount }).save()
        res.json(newCoupon)
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
}

exports.list = async (req, res) => {
    try {
        const coupons = await Coupon.find({}).sort({ createdAt: -1 }).exec()
        res.json(coupons)
    } catch (error) {
        console.log(error);
    }
}

exports.remove = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.couponId).exec()
        res.json(coupon)
    } catch (error) {
        console.log(error);
    }
}