import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import AdminNav from '../../../components/nav/AdminNav'
import { createProduct } from '../../../functions/product'
import CategoryForm from '../../../components/forms/CategoryForm'

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

    const {
        title,
        description,
        price,
        categories,
        category,
        subs,
        quantity,
        images,
        shipping,
        colors,
        color,
        brands,
        brand
    } = values

    const { user } = useSelector(state => ({ ...state }))

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(values);
        try {
            const response = await createProduct(user.token, values)
            toast.success('Product successfully created')
            setLoading(false)
        } catch (err) {
            console.log(err)
            toast.error(err.message)
            setLoading(false)
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
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input className="form-control" type="text" value={title} name="title" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input className="form-control" type="text" value={description} name="description" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input className="form-control" type="number" value={price} name="price" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Shipping</label>
                            <select name="shipping" className="form-control" onChange={handleChange}>
                                <option>Please select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input className="form-control" type="number" value={quantity} name="quantity" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Color</label>
                            <select name="color" className="form-control" onChange={handleChange}>
                                <option>Please select</option>
                                {colors.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Brand</label>
                            <select name="brand" className="form-control" onChange={handleChange}>
                                <option>Please select</option>
                                {brands.map(b => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-outline-info">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductCreate