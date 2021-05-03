import React, { useState } from 'react'
import { Card, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import _ from 'lodash'
import { useDispatch } from 'react-redux'

import imgPlaceholder from '../../images/placeholder.png'
import showAverage from '../../functions/rating'

const { Meta } = Card

const Styled = styled.div`
    .ant-card-bordered .ant-card-cover {
        height: 150px;
    }

    .ant-card-cover img {
        height: 100%;
        object-fit: cover;
    }

    .ant-card-body {
        height: 116px;
    }
`

const ProductCard = ({ product }) => {
    const { title, description, images, slug, price } = product

    const [tooltip, setTooltip] = useState('Click to add')

    const dispatch = useDispatch()

    const handleAddToCart = () => {
        let cart = []

        if (typeof window !== undefined) {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart.push({
                ...product,
                count: 1
            })

            // set only unique objects
            let unique = _.uniqWith(cart, _.isEqual)

            localStorage.setItem('cart', JSON.stringify(unique))

            // show tooltip
            setTooltip('Added to cart')

            // save to redux store
            dispatch({
                type: 'ADD_TO_CART',
                payload: unique
            })

            dispatch({
                type: 'SET_DRAWER',
                payload: true
            })
        }
    }

    return (
        <Styled>
            <div className="text-center mb-2">
                {product && product.ratings && product.ratings.length ? showAverage(product) : 'No ratings yet'}
            </div>
            <Card
                style={{ objectFit: "cover" }}
                cover={<img src={images.length ? images[0].url : imgPlaceholder} />}
                className="p-1"
                actions={[
                    <Link to={`/product/${slug}/`}>
                        <EyeOutlined className="text-primary" />
                        <br /> View Product
                    </Link>,
                    <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart}>
                            <ShoppingCartOutlined
                                className="text-danger"
                            />
                            <br /> Add to Cart
                        </a>
                    </Tooltip>
                ]}
            >
                <Meta
                    title={
                        <>
                            <div>{title}</div>
                            <div className="text-danger">$ {price}</div>
                        </>
                    }
                    description={`${description && description.substring(0, 40)}${(description.length > 40) ? '...' : ''}`}
                />
            </Card>
        </Styled>
    )
}

export default ProductCard
