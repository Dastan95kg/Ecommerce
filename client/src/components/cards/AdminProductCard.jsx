import React from 'react'
import { Card } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
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

const AdminProductCard = ({ product, handleRemove }) => {
    const { title, description, images, slug } = product

    return (
        <Styled>
            <Card
                style={{ objectFit: "cover" }}
                cover={<img src={images.length ? images[0].url : imgPlaceholder} />}
                className="p-1"
                actions={[
                    <Link to={`/admin/product/${slug}/`}>
                        <EditOutlined className="text-primary" />
                    </Link>,
                    <DeleteOutlined
                        className="text-danger"
                        onClick={() => handleRemove(slug)}
                    />
                ]}
            >
                <Meta
                    title={title}
                    description={`${description && description.substring(0, 40)}${description.length > 40 && '...'}`}
                />
            </Card>
        </Styled>
    )
}

export default AdminProductCard
