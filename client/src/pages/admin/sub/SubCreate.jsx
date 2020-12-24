import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import AdminNav from '../../../components/nav/AdminNav'
import { getCategories } from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'
import { createSub, getSubs, deleteSub } from '../../../functions/sub'
import LocalSearch from '../../../components/forms/LocalSearch'

const SubCreate = () => {
    const [subName, setSubName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [category, setCategory] = useState('')
    const [keyword, setKeyword] = useState('')

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        fetchCategories()
        fetchSubs()
    }, [])

    const fetchCategories = async () => {
        const categories = await getCategories()
        setCategories(categories.data)
    }

    const fetchSubs = async () => {
        const subs = await getSubs()
        setSubs(subs.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await createSub(user.token, subName, category)
            toast.success(`${response.data.name} is created`)
            setLoading(false)
            setSubName('')
            fetchSubs()
        } catch (err) {
            toast.error(err.message)
            setLoading(false)
        }
    }

    const handleDelete = async (slug) => {
        if (window.confirm(`Are you sure you want to delete "${slug}"?`)) {
            setLoading(true)
            deleteSub(user.token, slug)
                .then(res => {
                    setLoading(false)
                    toast.success(`${slug} is deleted`)
                    fetchSubs()
                })
                .catch(err => {
                    setLoading(false)
                    toast.error(err.response.data)
                })
        }
    }

    const searched = (keyword) => (sub) => sub.name.toLowerCase().includes(keyword)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading
                        ? <h4 className="text-danger">Loading...</h4>
                        : <h4>Create sub category</h4>
                    }
                    <div className="form-group">
                        <label>Parent category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option>Please select</option>
                            {categories.length > 0 && categories.map(c => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        categoryName={subName}
                        setCategoryName={setSubName}
                    />
                    <LocalSearch
                        keyword={keyword}
                        setKeyword={setKeyword}
                    />
                    <div className="my-3">
                        {subs
                            .filter(searched(keyword))
                            .map(sub => (
                                <div className="alert alert-secondary" key={sub._id}>
                                    {sub.name}
                                    <span className="btn btn-sm float-right" onClick={() => handleDelete(sub.slug)}>
                                        <DeleteOutlined className="text-danger" />
                                    </span>
                                    <Link to={`/admin/sub/${sub.slug}`}>
                                        <span className="btn btn-sm float-right">
                                            <EditOutlined className="text-primary" />
                                        </span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubCreate
