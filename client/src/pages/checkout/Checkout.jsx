import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserCart } from '../../functions/cart'

const Checkout = () => {
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    console.log('products', products);
    console.log('cartTotal', cartTotal);

    const { user } = useSelector(state => state)

    useEffect(() => {
        getUserCart(user.token)
            .then(res => {
                if (res) {
                    setProducts(res.data.products)
                    setCartTotal(res.data.cartTotal)
                }
            })
    }, [])

    return (
        <div className="container-fluid row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                textarea
                <button className="btn btn-primary">Save</button>
                <hr />
                <h4>Got Coupon?</h4>
                coupon input
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                <h1>{cartTotal}</h1>
                <hr />
                Products
                <hr />
                List of products
                <hr />
                Cart Total:
                <div className="row">
                    <button className="btn btn-primary">Place Order</button>
                    <button className="btn btn-primary">Empty Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Checkout
