import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { LoadingOutlined } from '@ant-design/icons'

import AdminNav from '../../../components/nav/AdminNav'
import { createProduct, getProduct } from '../../../functions/product'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'

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

const ProductUpdate = ({ match }) => {
    const [values, setValues] = useState(initialState)
    const [categories, setCategories] = useState([])
    console.log(values);

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        loadProduct()
        loadCategories()
    }, [])

    const loadProduct = () => {
        getProduct(match.params.slug)
            .then(resp => setValues({ ...values, ...resp.data }))
            .catch(err => console.log(err))
    }

    const loadCategories = () => {
        getCategories()
            .then(categories => setCategories(categories.data))
            .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Product update</h4>
                    <hr />
                    {JSON.stringify(values.categories)}

                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                        />
                    </div>

                    <ProductUpdateForm
                        values={values}
                        setValues={setValues}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        categories={categories}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate