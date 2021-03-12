import React from 'react'
import { Card, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import StarRatings from 'react-star-ratings';

import imgPlaceholder from '../../images/placeholder.png'
import ProductListItems from './ProductListItems'
import RatingModal from '../modal/RatingModal'

const { TabPane } = Tabs

const SingleProduct = ({ product }) => {
    const { title, images, description, _id } = product

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
                <div className="mb-3">
                    <StarRatings
                        rating={3}
                        starRatedColor="red"
                        changeRating={(newRating, name) => console.log('newRating: ', newRating, 'name: ', name)}
                        numberOfStars={5}
                        name={_id}
                        isSelectable={true}
                    />
                </div>
                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-success" /> Add to Cart
                        </>,
                        <Link to="/">
                            <HeartOutlined className="text-info" /> Add to Wishlist
                        </Link>,
                        <RatingModal>
                            <StarRatings
                                rating={3}
                                starRatedColor="red"
                                changeRating={(newRating, name) => console.log('newRating: ', newRating, 'name: ', name)}
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
