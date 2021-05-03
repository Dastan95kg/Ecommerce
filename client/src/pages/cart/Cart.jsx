import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ProductCardInCheckout from '../../components/cards/ProductCardInCheckout'

const Cart = () => {
    const { cart, user } = useSelector(state => state)

    const getTotalSum = () => {
        return cart.reduce((acc, current) => {
            return acc + (current.price * current.count)
        }, 0)
    }

    const saveOrderToDb = () => { }

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
                        <button
                            className="btn btn-sm btn-primary mt-2"
                            disabled={!cart.length}
                            onClick={saveOrderToDb}
                        >
                            Proceed to Checkout
                        </button>
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
