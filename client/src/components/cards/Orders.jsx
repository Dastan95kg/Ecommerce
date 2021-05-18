import React from 'react'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import ShowPaymentInfo from './ShowPaymentInfo'

const Orders = ({ orders, handleStatusChange }) => {
    console.log(orders);

    const showOrderInTable = (order) =>
        <table className="table table-bordered mb-0 mt-2">
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

    return orders.map(order => (
        <div
            key={order._id}
            className="btn bg-light mb-3 w-100"
        >
            <ShowPaymentInfo
                order={order}
                showStatus={false}
            />
            <div className="d-flex align-items-center">
                <div className="mr-3">Delivery status</div>
                <select
                    className="form-control"
                    defaultValue={order.orderStatus}
                    onChange={e => handleStatusChange(e.target.value, order._id)}
                >
                    <option value="Not Processed">Not Processed</option>
                    <option value="Processing">Processing</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            {showOrderInTable(order)}
        </div>
    ))
}

export default Orders
