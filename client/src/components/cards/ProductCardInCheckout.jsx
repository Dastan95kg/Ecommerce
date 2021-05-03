import React from 'react'
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import ModalImage from "react-modal-image";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'

import placeholderImg from '../../images/placeholder.png'

const ProductCardInCheckout = ({ product }) => {
    const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue']

    const dispatch = useDispatch()

    const handleColorChange = e => {
        let cart = []

        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart.map(item => {
                if (item._id === product._id) {
                    item.color = e.target.value
                }
            })

            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({ type: 'ADD_TO_CART', payload: cart })
        }
    }

    const handleQuantityChange = e => {
        let cart = []

        if (e.target.value < 1) return

        if (e.target.value > product.quantity) {
            toast.error(`Max available quantity: ${product.quantity}`)
            return
        }

        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart.map(item => {
                if (item._id === product._id) {
                    item.count = e.target.value
                }
            })

            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({ type: 'ADD_TO_CART', payload: cart })
        }
    }

    const handleRemove = () => {
        let cart = []

        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart = cart.filter(item => item._id !== product._id)

            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({ type: 'ADD_TO_CART', payload: cart })
        }
    }

    return (
        <tr>
            <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '100px', height: 'auto' }}>
                    {product.images.length ? (
                        <ModalImage
                            small={product.images[0].url}
                            large={product.images[0].url}
                        />
                    ) : (
                        <ModalImage
                            small={placeholderImg}
                            large={placeholderImg}
                        />
                    )}
                </div>
            </td>
            <td>{product.title}</td>
            <td>${product.price}</td>
            <td>{product.brand}</td>
            <td>
                <div>
                    <select
                        className="form-control"
                        name="color"
                        onChange={handleColorChange}
                    >
                        {product.color ? <option value={product.color}>{product.color}</option> : <option>Select color</option>}
                        {colors
                            .filter(c => c !== product.color)
                            .map(c => <option key={c} value={c}>{c}</option>)
                        }
                    </select>
                </div>
            </td>
            <td className="text-center">
                <input
                    type="number"
                    className="form-control"
                    value={product.count}
                    onChange={handleQuantityChange}
                />
            </td>
            <td className="text-center">
                {product.shipping === "Yes"
                    ? <CheckCircleOutlined className="text-success" />
                    : <CloseCircleOutlined className="text-danger" />
                }
            </td>
            <td>
                <CloseOutlined
                    className="text-danger pointer"
                    onClick={handleRemove}
                />
            </td>
        </tr>
    )
}

export default ProductCardInCheckout
