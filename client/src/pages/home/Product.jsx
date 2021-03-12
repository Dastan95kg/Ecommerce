import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getProduct, productRelated, productStar } from '../../functions/product'
import SingleProduct from '../../components/cards/SingleProduct'
import ProductCard from '../../components/cards/ProductCard'

const Product = ({ match }) => {
    const [product, setProduct] = useState('')
    const [star, setStar] = useState(0)
    const [related, setRelated] = useState([])

    console.log(related);

    const { user } = useSelector(state => ({ ...state }))
    const { slug } = match.params

    useEffect(() => {
        loadProduct()
    }, [slug])

    useEffect(() => {
        if (user && user.token && product.ratings) {
            let existingRatingObject = product && product.ratings.find(elem => elem.postedBy.toString() === user._id.toString())
            existingRatingObject && setStar(existingRatingObject.star) // current user's star
        }
    })

    const loadProduct = () => {
        getProduct(match.params.slug)
            .then(res => {
                setProduct(res.data)
                productRelated(res.data._id)
                    .then(res => setRelated(res.data))
            })
    }

    const onStarClick = (newRating, name) => {
        setStar(newRating)
        if (user && user.token) {
            productStar(name, newRating, user.token)
                .then(res => {
                    loadProduct()
                })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct
                    product={product}
                    star={star}
                    onStarClick={onStarClick}
                />
            </div>
            <div className="row">
                <div className="col text-center py-5">
                    <hr />
                    <h4>Related products</h4>
                    <hr />
                    <div className="row">
                        {related.length ? related.map(product => (
                            <div
                                className="col-md-4"
                                key={product._id}
                            >
                                <ProductCard product={product} />
                            </div>
                        )) : (
                            <div className="text-center col">No Products Found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
