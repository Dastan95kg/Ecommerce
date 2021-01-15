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
    const [subsIds, setSubsIds] = useState([])
    const [subOptions, setSubOptions] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')

    console.log(subsIds);

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        loadProduct()
        loadCategories()
    }, [])

    const loadProduct = () => {
        getProduct(match.params.slug)
            .then(resp => {
                // 1. load single product
                setValues({ ...values, ...resp.data })
                // 2. load single product category subs
                getCategorySubs(resp.data.category._id)
                    .then(res => setSubOptions(res.data))
                // 3. prepare array of sub ids to show as default sub
                const arr = []
                resp.data.subs.map(sub => arr.push(sub._id))
                setSubsIds((prev) => arr)
            })
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

    const handleCategoryChange = (e) => {
        e.preventDefault()
        setSelectedCategory(e.target.value)
        getCategorySubs(e.target.value)
            .then(resp => setSubOptions(resp.data))

        // clear subcategories array of ids
        setSubsIds([])
        // if user clicks back to the original category
        // show its sub categories in default
        if (values.category._id === e.target.value) {
            loadProduct()
        }
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
                        subsIds={subsIds}
                        setSubsIds={setSubsIds}
                        subOptions={subOptions}
                        handleCategoryChange={handleCategoryChange}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate