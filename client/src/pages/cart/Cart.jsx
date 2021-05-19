import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ProductCardInCheckout from '../../components/cards/ProductCardInCheckout'
import { saveUserCart } from '../../functions/cart'

const Cart = ({ history }) => {
    const { cart, user, COD } = useSelector(state => state)
    const dispatch = useDispatch()

    const getTotalSum = () => {
        return cart.reduce((acc, current) => {
            return acc + (current.price * current.count)
        }, 0)
    }

    const saveOrderToDb = (cash = false) => {
        console.log('CASH', cash);
        dispatch({
            type: 'COD',
            payload: false
        })

        if (cash) {
            dispatch({
                type: 'COD',
                payload: true
            })
        }

        saveUserCart(cart, user.token)
            .then(res => {
                if (res.data.ok) {
                    history.push('/checkout')
                }
            })
            .catch(err => console.log(err))
    }

    const showProducts = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>
            <tbody>
                {cart.map(product => (
                    <ProductCardInCheckout
                        key={product._id}
                        product={product}
                    />
                ))}
            </tbody>
        </table>
    )

    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <div className="col-md-8">
                    <h4>Cart / {cart.length} Product</h4>
                    {!cart.length ? (
                        <p>No products in cart. <Link to="/shop">Continue shopping.</Link></p>
                    ) : (
                        showProducts()
                    )}
                </div>
                <div className="col-md-4">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    {cart.map(c => (
                        <p key={c._id}>{c.title} x {c.count} = ${c.price * c.count}</p>
                    ))}
                    <hr />
                    <p>Total: ${getTotalSum()}</p>
                    <hr />
                    {user.token ? (
                        <>
                            <button
                                className="btn btn-sm btn-primary mt-2"
                                disabled={!cart.length}
                                onClick={() => saveOrderToDb()}
                            >
                                Proceed to Checkout
                            </button>
                            <br />
                            <button
                                className="btn btn-sm btn-warning mt-2"
                                disabled={!cart.length}
                                onClick={() => saveOrderToDb(true)}
                            >
                                Pay Cash On Delivery
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-sm btn-primary mt-2">
                            <Link
                                to={{
                                    pathname: '/login',
                                    state: { from: '/cart' }
                                }}
                            >
                                Login to Checkout
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cart
