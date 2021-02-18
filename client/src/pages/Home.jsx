import React, { useEffect, useState } from 'react';

import ProductCard from '../components/cards/ProductCard';
import { getProducts } from '../functions/product'

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProducts(3)
            .then(res => {
                setProducts(res.data)
                setLoading(false)
            })
    }

    return (
        <>
            <div className="jumbotron">
                {loading ? <div>Loading...</div> : <div>All Products</div>}
            </div>

            <div className="container">
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
            </div>
        </>
    )
}

export default Home;
