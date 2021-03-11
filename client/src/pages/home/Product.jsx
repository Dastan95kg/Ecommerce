import React, { useEffect, useState } from 'react'
import { getProduct } from '../../functions/product'
import SingleProduct from '../../components/cards/SingleProduct'

const Product = ({ match }) => {
    const [product, setProduct] = useState('')

    useEffect(() => {
        getProduct(match.params.slug)
            .then(res => setProduct(res.data))
    }, [])

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct product={product} />
            </div>
            <div className="row">
                <div className="col text-center py-5">
                    <hr />
                    <h4>Related products</h4>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default Product
