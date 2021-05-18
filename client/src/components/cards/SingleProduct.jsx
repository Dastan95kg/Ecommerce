import React, { useState } from 'react'
import { Card, Tabs, Tooltip } from 'antd'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import StarRatings from 'react-star-ratings';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import imgPlaceholder from '../../images/placeholder.png'
import ProductListItems from './ProductListItems'
import RatingModal from '../modal/RatingModal'
import showAverage from '../../functions/rating'
import { addProductToWishlist } from '../../functions/product'
import { toast } from 'react-toastify'

const { TabPane } = Tabs

const SingleProduct = ({ product, onStarClick, star }) => {
    const { title, images, description, _id } = product

    const [tooltip, setTooltip] = useState('Click to add')

    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector(state => state)

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

    const handleAddProductToWishlist = () => {
        addProductToWishlist(_id, user.token)
            .then(res => {
                if (res.data.ok) {
                    history.push('/user/wishlist')
                    toast.success('Added to wishlist')
                }
            })
    }

    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (
                    <Carousel
                        showArrows={true}
                        autoPlay
                        infiniteLoop
                    >
                        {images && images.map(i => (
                            <div key={i.public_id}>
                                <img src={i.url} alt="product" />
                            </div>
                        ))}
                    </Carousel>
                ) : (
                    <img src={imgPlaceholder} className="card-image mb-3" />
                )}
                <Tabs type="card">
                    <TabPane tab="Description" key="1">{description && description}</TabPane>
                    <TabPane tab="More" key="2">Call us on XXXXXX to get info about this product</TabPane>
                </Tabs>
            </div>
            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                <div className="mb-3 text-center">
                    {product && product.ratings && product.ratings.length ? showAverage(product) : 'No ratings yet'}
                </div>
                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}>
                                <ShoppingCartOutlined
                                    className="text-danger"
                                />
                                <br /> Add to Cart
                                </a>
                        </Tooltip>,
                        <a onClick={handleAddProductToWishlist}>
                            <HeartOutlined className="text-info" /><br /> Add to Wishlist
                        </a>,
                        <RatingModal>
                            <StarRatings
                                rating={star}
                                starRatedColor="red"
                                changeRating={onStarClick}
                                numberOfStars={5}
                                name={_id}
                                isSelectable={true}
                            />
                        </RatingModal>
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    )
}

export default SingleProduct
