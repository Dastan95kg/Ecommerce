import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import CategoryForm from '../../../components/forms/CategoryForm'
import AdminNav from '../../../components/nav/AdminNav'
import { getCategories } from '../../../functions/category'
import { getSub, updateSub } from '../../../functions/sub'

const SubUpdate = ({ history, match }) => {
    const [subName, setSubName] = useState('')
    const [parent, setParent] = useState('')
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        loadSub()
        loadCategories()
    }, [])

    const loadSub = async () => {
        getSub(match.params.slug).then(res => {
            setSubName(res.data.name)
            setParent(res.data.parent)
        })
    }

    const loadCategories = async () => {
        getCategories().then(res => setCategories(res.data))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await updateSub(user.token, parent, subName, match.params.slug)
            toast.success(`${response.data.name} is updated`)
            setLoading(false)
            history.push('/admin/sub')
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
                        : <h4>Update sub category</h4>
                    }
                    <div className="form-group">
                        <label>Parent category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={e => setParent(e.target.value)}
                        >
                            <option>Please select</option>
                            {categories.length > 0 && categories.map(c => (
                                <option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        categoryName={subName}
                        setCategoryName={setSubName}
                    />
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default SubUpdate
