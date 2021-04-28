import React, { useEffect, useState } from 'react'

import ProductCard from '../../components/cards/ProductCard'
import { getSub } from '../../functions/sub'

const SubHome = ({ match }) => {
    const [sub, setSub] = useState({})
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { slug } = match.params

    console.log(sub, 'sub');

    useEffect(() => {
        setIsLoading(true)
        getSub(slug)
            .then(res => {
                setSub(res.data.sub)
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
                                <strong><span> "{sub.name}" </span></strong>
                                sub category
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

export default SubHome
