import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import CategoryForm from '../../../components/forms/CategoryForm'
import AdminNav from '../../../components/nav/AdminNav'
import { getCategory, updateCategory } from '../../../functions/category'

const CategoryUpdate = ({ history, match }) => {
    const [categoryName, setCategoryName] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = async () => {
        getCategory(match.params.slug).then(res => setCategoryName(res.data.name))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await updateCategory(user.token, categoryName, match.params.slug)
            toast.success(`${response.data.name} is updated`)
            setLoading(false)
            history.push('/admin/category')
        } catch (err) {
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
                <div className="col">
                    {loading
                        ? <h4 className="text-danger">Loading...</h4>
                        : <h4>Update category</h4>
                    }
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        categoryName={categoryName}
                        setCategoryName={setCategoryName}
                    />
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate
