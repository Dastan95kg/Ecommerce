import React from 'react'
import { Card, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

import imgPlaceholder from '../../images/placeholder.png'
import ProductListItems from './ProductListItems'

const { TabPane } = Tabs

const SingleProduct = ({ product }) => {
    const { title, images, description } = product

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
                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-success" /> Add to Cart
                        </>,
                        <Link to="/">
                            <HeartOutlined className="text-info" /> Add to Wishlist
                        </Link>,
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    )
}

export default SingleProduct
