import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Orders from '../../components/cards/Orders'
import AdminNav from '../../components/nav/AdminNav'
import { changeOrderStatus, getOrders } from '../../functions/admin'

const AdminDashboard = () => {
    const [orders, setOrders] = useState([])

    const { user } = useSelector(state => state)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = () => {
        getOrders(user.token).then(res => setOrders(res.data))
    }

    const handleStatusChange = (orderStatus, orderId) => {
        changeOrderStatus(orderId, orderStatus, user.token)
            .then(res => {
                if (res.data) {
                    toast.success('Status successfully changed')
                }
            })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4 className="mt-1">Admin Dashboard</h4>
                    <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
