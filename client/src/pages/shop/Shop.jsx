import React, { useEffect, useState } from 'react'

import { getProductsCount } from '../../functions/product'
import ProductCard from '../../components/cards/ProductCard'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    console.log('products', products);

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        setLoading(true)
        getProductsCount(12)
            .then(res => setProducts(res.data))
            .finally(() => setLoading(false))
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">Search/Filter Menu</div>

                <div className="col-md-9">
                    <h4 className="text-danger">{loading ? 'Loading...' : 'Products'}</h4>
                    <div className="row">
                        {products.map(product => (
                            <div className="col-md-4">
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
