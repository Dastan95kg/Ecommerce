import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import AdminNav from '../../../components/nav/AdminNav'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { getCategories, getCategorySubs } from '../../../functions/category'

const initialState = {
    title: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    quantity: '',
    images: [],
    shipping: '',
    colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    color: '',
    brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
    brand: ''
}

const ProductCreate = () => {
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [showSubs, setShowSubs] = useState(false)

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => {
        getCategories().then(categories => setValues({ ...values, categories: categories.data }))
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await createProduct(user.token, values)
            window.alert(`"${response.data.title}" successfully created`)
            window.location.reload()
            setLoading(false)
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.err)
            setLoading(false)
        }
    }

    const handleCategoryChange = (e) => {
        e.preventDefault()
        if (e.target.value) {
            setValues({ ...values, subs: [], category: e.target.value })
            getCategorySubs(e.target.value)
                .then(res => {
                    setSubOptions(res.data)
                    setShowSubs(true)
                })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {loading
                        ? <h4 className="text-danger">Loading...</h4>
                        : <h4>Product create</h4>
                    }
                    <hr />
                    <ProductCreateForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        values={values}
                        setValues={setValues}
                        handleCategoryChange={handleCategoryChange}
                        showSubs={showSubs}
                        subOptions={subOptions}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCreate