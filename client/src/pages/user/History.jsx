import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { PDFDownloadLink } from '@react-pdf/renderer'

import UserNav from '../../components/nav/UserNav'
import { getOrders } from '../../functions/cart'
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo'
import Invoice from '../../components/cards/Invoice'

const History = () => {
    const [orders, setOrders] = useState([])

    const { user } = useSelector(state => state)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = () => {
        getOrders(user.token)
            .then(res => setOrders(res.data))
    }

    const showEachOrders = () =>
        orders.reverse().map((order, i) => (
            <div
                key={i}
                className="m-5 p-3 card"
            >
                <ShowPaymentInfo order={order} />
                {showOrderInTable(order)}
                <div className="row">
                    <div className="col">
                        <PDFDownloadLink
                            document={<Invoice order={order} />}
                            className="btn btn-block btn-outline-primary text-primary"
                            fileName="invoice.pdf"
                        >
                            Download PDF
                        </PDFDownloadLink>
                    </div>
                </div>
            </div>
        ))

    const showOrderInTable = (order) =>
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>
            <tbody>
                {order && order.products.map((p, i) => (
                    <tr key={i}>
                        <td><b>{p.product.title}</b></td>
                        <td>{p.product.price}</td>
                        <td>{p.product.brand}</td>
                        <td>{p.product.color}</td>
                        <td>{p.count}</td>
                        <td>
                            {p.product.shipping === "Yes"
                                ? <CheckCircleOutlined style={{ color: 'green' }} />
                                : <CloseCircleOutlined style={{ color: 'red' }} />
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col text-center">
                    <h4 className="mt-2">{orders.length ? 'User purchase orders' : 'No purchase orders'}</h4>
                    {showEachOrders()}
                </div>
            </div>
        </div>
    )
}

export default History
