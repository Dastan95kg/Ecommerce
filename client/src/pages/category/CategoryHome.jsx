import React, { useEffect, useState } from 'react'

import { getCategory } from '../../functions/category'
import ProductCard from '../../components/cards/ProductCard'

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { slug } = match.params

    console.log(category, 'category');

    useEffect(() => {
        setIsLoading(true)
        getCategory(slug)
            .then(res => {
                setCategory(res.data.category)
                setProducts(res.data.products)
            })
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <div className="container-fluid">
            {isLoading ? <div className="text-center mt-5">Loading...</div> : (
                <>
                    <div className="row">
                        <div className="col">
                            <h4 className="jumbotron text-center p-3 my-5 display-4">
                                {products.length} Products in
                                <strong><span> "{category.name}" </span></strong>
                                category
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        {products && products.map(product => (
                            <div className="col-md-4">
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default CategoryHome
