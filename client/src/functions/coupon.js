import axios from 'axios';

export const createCoupon = async (authtoken, coupon) =>
    await axios.post(
        `${process.env.REACT_APP_API}/coupon`,
        { ...coupon },
        { headers: { authtoken } }
    )

export const getCoupons = async () =>
    await axios.get(`${process.env.REACT_APP_API}/coupons`)

export const deleteCoupon = async (authtoken, couponId) =>
    await axios.delete(
        `${process.env.REACT_APP_API}/coupon/${couponId}`,
        { headers: { authtoken } }
    )