import React from 'react'
import { Card } from 'antd'

const { Meta } = Card

const AdminProductCard = ({ product }) => {
    const { title, description, images } = product

    return (
        <Card
            hoverable
            style={{ height: '150px', objectFit: "cover" }}
            cover={<img src={images && images.length ? images[0].url : ''} />}
            className="p-1"
        >
            <Meta title={title} description={description} />
        </Card>
    )
}

export default AdminProductCard
