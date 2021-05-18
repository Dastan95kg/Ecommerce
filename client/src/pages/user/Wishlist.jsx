import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

import UserNav from '../../components/nav/UserNav'
import { getWishlist, removeProductFromWishlist } from '../../functions/product'
import { Link } from 'react-router-dom'

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([])

    const { user } = useSelector(state => state)

    useEffect(() => {
        loadWishlist()
    }, [])

    const loadWishlist = () => {
        getWishlist(user.token).then(res => setWishlist(res.data.wishlist))
    }

    const handleRemove = (id) => {
        removeProductFromWishlist(id, user.token)
            .then(res => {
                if (res.data.ok) {
                    toast.error('Product removed from wishlist')
                    loadWishlist()
                }
            })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <h4>Wishlist</h4>
                    {wishlist.map(p => (
                        <div
                            key={p._id}
                            className="bg-light mb-2 p-3"
                        >
                            <Link to={`/product/${p.slug}`}>{p.title}</Link>
                            <span
                                className="float-right"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleRemove(p._id)}
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Wishlist
