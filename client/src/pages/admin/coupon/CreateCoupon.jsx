import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { DeleteOutlined } from '@ant-design/icons'
import { Popconfirm } from 'antd'

import AdminNav from '../../../components/nav/AdminNav'
import { createCoupon, deleteCoupon, getCoupons } from '../../../functions/coupon'

const CreateCoupon = () => {
    const [name, setName] = useState('')
    const [discount, setDiscount] = useState('')
    const [expiry, setExpiry] = useState(new Date())
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(false)

    const { user } = useSelector(state => state)

    useEffect(() => {
        fetchAllCoupons()
    }, [])

    const fetchAllCoupons = () => {
        setLoading(true)
        getCoupons()
            .then(res => setCoupons(res.data))
            .finally(() => setLoading(false))
    }

    const handleSubmit = e => {
        e.preventDefault()

        createCoupon(user.token, { name, discount, expiry })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Coupon successfully created")
                    fetchAllCoupons()

                    setName('')
                    setDiscount('')
                    setExpiry(new Date())
                }
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message)
                }
            })
    }

    const handleRemove = (couponId) => {
        deleteCoupon(user.token, couponId)
            .then(res => {
                if (res.data) {
                    toast.error(`Coupon ${res.data.name} is removed`)
                    fetchAllCoupons()
                }
            })
    }

    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading
                        ? <h4 className="text-danger">Loading...</h4>
                        : <h4>Coupon</h4>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="discount">Discount %</label>
                            <input
                                id="discount"
                                type="number"
                                className="form-control"
                                value={discount}
                                onChange={e => setDiscount(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Expiry</label>
                            <br />
                            <DatePicker
                                id="date"
                                className="form-control"
                                selected={expiry}
                                onChange={date => setExpiry(date)}
                            />
                        </div>

                        <button
                            className="btn btn-outline-primary"
                            disabled={!name || !discount}
                        >
                            Save
                        </button>
                    </form>

                    {coupons.length ? (
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Expiry</th>
                                    <th>Discount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map(c => (
                                    <tr key={c._id}>
                                        <td>{c.name}</td>
                                        <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                        <td>{c.discount} %</td>
                                        <td className="text-center">
                                            <Popconfirm
                                                title={`Are you sure to delete "${c.name}" coupon?`}
                                                onConfirm={() => handleRemove(c._id)}
                                                okText="Yes"
                                                cancelText="No"
                                                placement="topRight"
                                            >
                                                <DeleteOutlined className="text-danger pointer" />
                                            </Popconfirm>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="h6">No Coupons</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateCoupon
