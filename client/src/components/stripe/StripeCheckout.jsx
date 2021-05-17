import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { DollarOutlined, CheckOutlined } from '@ant-design/icons'

import { createPaymentIntent } from '../../functions/stripe'
import placeholder from '../../images/placeholder.png'
import { createOrder, emptyUserCart } from '../../functions/cart'

const StripeCheckout = ({ history }) => {
    const [processing, setProcessing] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [clientSecret, setClientSecret] = useState("")

    const [cartTotal, setCartTotal] = useState(0)
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [payable, setPayable] = useState(0)

    const { user, coupon } = useSelector(state => state)
    const dispatch = useDispatch()

    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        createPaymentIntent(user.token, coupon)
            .then(res => {
                setClientSecret(res.data.clientSecret)
                // additional response received on successful payment
                setCartTotal(res.data.cartTotal)
                setTotalAfterDiscount(res.data.totalAfterDiscount)
                setPayable(res.data.payable)
            })
    }, [])

    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`)
            setProcessing(false)
        } else {
            createOrder(user.token, payload)
                .then(res => {
                    debugger
                    if (res.data.ok) {
                        // empty cart from local storage
                        localStorage.removeItem('cart')
                        // empty cart from redux
                        dispatch({
                            type: "ADD_TO_CART",
                            payload: []
                        })
                        // empty coupon
                        dispatch({
                            type: "COUPON_APPLIED",
                            payload: false
                        })
                        // empty cart from database
                        emptyUserCart(user.token)
                    }
                })

            setError(null)
            setProcessing(false)
            setSucceeded(true)
        }
    }

    const handleChange = (e) => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")
    }

    return (
        <>
            {coupon && totalAfterDiscount ? (
                <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
            ) : (
                <p className="alert alert-danger">No coupon applied</p>
            )}

            <div className="text-center">
                <Card
                    cover={
                        <img
                            src={placeholder}
                            style={{
                                height: "200px",
                                objectFit: "cover",
                                marginBottom: "-50px"
                            }}
                        />
                    }
                    actions={[
                        <>
                            <DollarOutlined className="text-info" />
                            Total: ${cartTotal}
                        </>,
                        <>
                            <CheckOutlined className="text-info" />
                            Total payable: ${totalAfterDiscount || cartTotal}
                        </>
                    ]}
                />
            </div>

            <form
                id="payment-form"
                className="stripe-form"
                onSubmit={handleSubmit}
            >
                <CardElement
                    id="card-element"
                    options={cartStyle}
                    onChange={handleChange}
                />
                <button
                    className="stripe-button"
                    disabled={processing || disabled || succeeded}
                >
                    <span id="button-text">
                        {processing ? <div className="spinner" id="spinner" /> : "Pay"}
                    </span>
                </button>

                {error && <div className="card-error mt-2" role="alert">{error}</div>}

                <p className={succeeded ? "result-message pt-3" : "result-message hidden"}>
                    Payment Successful. {" "}
                    <Link to="/user/history">See it in your purchase history.</Link>
                </p>
            </form>
        </>
    )
}

export default StripeCheckout
