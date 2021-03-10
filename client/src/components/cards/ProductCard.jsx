import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import imgPlaceholder from '../../images/placeholder.png'

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
    const { title, description, images, slug } = product

    return (
        <Styled>
            <Card
                style={{ objectFit: "cover" }}
                cover={<img src={images.length ? images[0].url : imgPlaceholder} />}
                className="p-1"
                actions={[
                    <Link to={`/product/${slug}/`}>
                        <EyeOutlined className="text-primary" />
                        <br /> View Product
                    </Link>,
                    <>
                        <ShoppingCartOutlined
                            className="text-danger"
                        />
                        <br /> Add to Cart
                    </>
                ]}
            >
                <Meta
                    title={title}
                    description={`${description && description.substring(0, 40)}${(description.length > 40) ? '...' : ''}`}
                />
            </Card>
        </Styled>
    )
}

export default ProductCard
