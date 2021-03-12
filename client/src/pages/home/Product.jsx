import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getProduct, productStar } from '../../functions/product'
import SingleProduct from '../../components/cards/SingleProduct'

const Product = ({ match }) => {
    const [product, setProduct] = useState('')
    const [star, setStar] = useState(0)
    const { user } = useSelector(state => ({ ...state }))
    const { slug } = match.params

    console.log('star', star);
    console.log('product', product);

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
            .then(res => setProduct(res.data))
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
                </div>
            </div>
        </div>
    )
}

export default Product
