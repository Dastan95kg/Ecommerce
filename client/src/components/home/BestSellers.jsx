import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'

import LoadingCard from '../../components/cards/LoadingCard';
import ProductCard from '../../components/cards/ProductCard';
import { getHomeProducts, getProductsTotal } from '../../functions/product'

const BestSellers = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalProducts, setTotalProducts] = useState(1)

    useEffect(() => {
        loadAllProducts()
    }, [page])

    useEffect(() => {
        getProductsTotal().then(res => setTotalProducts(res.data))
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getHomeProducts('sold', 'desc', page)
            .then(res => setProducts(res.data))
            .finally(() => setLoading(false))
    }

    return (
        <div className="container pb-5">
            {loading ? <LoadingCard count={3} /> : (
                <>
                    <div className="row mb-3">
                        {products.map(product => (
                            <div
                                key={product._id}
                                className="col-md-4"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            current={page}
                            total={totalProducts / 3 * 10}
                            onChange={value => setPage(value)}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default BestSellers
