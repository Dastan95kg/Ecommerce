import axios from 'axios'

export const saveUserCart = async (cart, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart`,
        { cart },
        { headers: { authtoken } }
    )

export const getUserCart = async (authtoken) =>
    await axios.get(
        `${process.env.REACT_APP_API}/user/cart`,
        { headers: { authtoken } }
    )

export const emptyUserCart = async (authtoken) =>
    await axios.delete(
        `${process.env.REACT_APP_API}/user/cart`,
        { headers: { authtoken } }
    )

export const saveUserAddress = async (authtoken, address) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/address`,
        { address },
        { headers: { authtoken } }
    )

export const applyCouponToCart = async (authtoken, coupon) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart/coupon`,
        { coupon },
        { headers: { authtoken } }
    )

export const createOrder = async (authtoken, paymentIntent) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/order`,
        { stripeResponse: paymentIntent },
        { headers: { authtoken } }
    )

export const getOrders = async (authtoken) =>
    await axios.get(
        `${process.env.REACT_APP_API}/user/orders`,
        { headers: { authtoken } }
    )

export const createCashOrder = async (authtoken, COD, coupon) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cash-order`,
        { COD, couponApplied: coupon },
        { headers: { authtoken } }
    )