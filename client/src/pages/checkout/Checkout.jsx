import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { getUserCart, emptyUserCart, saveUserAddress, applyCouponToCart } from '../../functions/cart'

const Checkout = () => {
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)
    const [coupon, setCoupon] = useState('')

    const { user } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        getUserCart(user.token)
            .then(res => {
                if (res) {
                    setProducts(res.data.products)
                    setCartTotal(res.data.cartTotal)
                }
            })
    }, [])

    const emptyCart = () => {
        // remove cart from local storage
        localStorage.removeItem('cart')
        // remove cart from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: []
        })
        // remove cart from backend
        emptyUserCart(user.token)
            .then(res => {
                if (res.status === 200) {
                    toast.success('Cart is empty')
                    setProducts([])
                    setCartTotal(0)
                }
            })
            .catch(() => toast.error('Oops. Try again'))
    }

    const handleSaveAddress = () => {
        saveUserAddress(user.token, address)
            .then(res => {
                if (res.data.ok) {
                    setAddressSaved(true)
                    toast.success('Address saved')
                }
            })
    }

    const applyDiscountCoupon = () => {
        applyCouponToCart(user.token, coupon)
            .then(res => {
                if (res.data) {
                    toast.success("Your coupon applied!")
                }
            })
            .catch(err => {
                if (err.response.data) {
                    toast.error(err.response.data.err)
                }
            })
    }

    const showDiscountCoupon = () => (
        <>
            <h4>Got Coupon?</h4>
            <input
                type="text"
                className="form-control"
                placeholder="Type your coupon name"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
            />
            <button
                className="btn btn-primary mt-3"
                onClick={applyDiscountCoupon}
                disabled={!coupon.trim()}
            >
                Apply
            </button>
        </>
    )

    return (
        <div className="container-fluid row pt-2">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <ReactQuill
                    theme="snow"
                    value={address}
                    onChange={setAddress}
                />
                <button
                    className="btn btn-primary mt-2"
                    onClick={handleSaveAddress}
                >
                    Save
                </button>
                <hr />
                {showDiscountCoupon()}
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <div>Products {products.length}</div>
                <hr />
                {products.map(p => (
                    <div key={p._id} className="py-1">
                        {p.product.title} ({p.color}) x {p.count} = {p.product.price * p.count}
                    </div>
                ))}
                <hr />
                <div className="mb-3">Cart Total: {cartTotal}</div>
                <div className="row">
                    <button
                        className="btn btn-primary mr-5"
                        disabled={!addressSaved || !products.length}
                    >
                        Place Order
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={emptyCart}
                        disabled={!products.length}
                    >
                        Empty Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Checkout
