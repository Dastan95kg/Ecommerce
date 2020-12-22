import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import AdminNav from '../../../components/nav/AdminNav'
import { createCategory, getCategories, deleteCategory } from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryCreate = () => {
    const [categoryName, setCategoryName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        const categories = await getCategories()
        setCategories(categories.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await createCategory(user.token, categoryName)
            toast.success(`${response.data.name} is created`)
            setLoading(false)
            setCategoryName('')
            fetchCategories()
        } catch (err) {
            toast.error(err.message)
            setLoading(false)
        }
    }

    const handleDelete = async (slug) => {
        if (window.confirm(`Are you sure you want to delete "${slug}"?`)) {
            setLoading(true)
            deleteCategory(user.token, slug)
                .then(res => {
                    setLoading(false)
                    toast.success(`${slug} is deleted`)
                    fetchCategories()
                })
                .catch(err => {
                    setLoading(false)
                    toast.error(err.response.data)
                })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading
                        ? <h4 className="text-danger">Loading...</h4>
                        : <h4>Create category</h4>
                    }
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        categoryName={categoryName}
                        setCategoryName={setCategoryName}
                    />
                    <hr />
                    <div className="my-3">
                        {categories && categories.map(category => (
                            <div className="alert alert-secondary" key={category._id}>
                                {category.name}
                                <span className="btn btn-sm float-right" onClick={() => handleDelete(category.slug)}>
                                    <DeleteOutlined className="text-danger" />
                                </span>
                                <Link to={`/admin/category/${category.slug}`}>
                                    <span className="btn btn-sm float-right">
                                        <EditOutlined className="text-primary" />
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate
