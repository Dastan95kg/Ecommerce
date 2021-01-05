import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import AdminNav from '../../../components/nav/AdminNav'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import { getProducts, removeProduct } from '../../../functions/product'

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = async () => {
        setLoading(true)
        try {
            const response = await getProducts(100)
            setLoading(false)
            setProducts(response.data)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const handleRemoveProduct = (slug) => {
        if (window.confirm(`Are you sure to delete "${slug}"?`)) {
            removeProduct(user ? user.token : '', slug)
                .then(resp => {
                    toast.success(`${resp.data.title} is deleted`)
                    loadAllProducts()
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        toast.error(err.response.data)
                    }
                })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading
                        ? <h4 className="text-danger">Loading...</h4>
                        : <h4>All Products</h4>
                    }
                    <div className="row">
                        {products.map(product => (
                            <div
                                key={product._id}
                                className="col-md-4 pb-3"
                            >
                                <AdminProductCard
                                    product={product}
                                    handleRemove={handleRemoveProduct}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts
