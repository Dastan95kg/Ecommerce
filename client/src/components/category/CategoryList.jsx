import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getCategories } from '../../functions/category'

const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getCategories()
            .then(res => {
                setLoading(false)
                setCategories(res.data)
            })
    }, [])

    const showCategories = () => categories.map(c => (
        <Link
            key={c._id}
            className="btn btn-raised btn-outlined-primary btn-lg btn-block m-3 col text-info"
            to={`/category/${c.slug}`}
        >
            {c.name}
        </Link>
    ))

    return (
        <div className="container pb-5">
            <div className="row">
                {loading ? <div className="text-center">Loading...</div> : showCategories()}
            </div>
        </div>
    )
}

export default CategoryList
