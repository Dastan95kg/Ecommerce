import React, { useEffect, useState } from 'react'

import LoadingCard from '../../components/cards/LoadingCard';
import ProductCard from '../../components/cards/ProductCard';
import { getHomeProducts } from '../../functions/product'

const NewArrivals = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getHomeProducts('createdAt', 'desc', 3)
            .then(res => {
                setProducts(res.data)
                setLoading(false)
            })
    }

    return (
        <div className="container">
            {loading ? <LoadingCard count={3} /> : (
                <div className="row">
                    {products.map(product => (
                        <div
                            key={product._id}
                            className="col-md-4"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NewArrivals
