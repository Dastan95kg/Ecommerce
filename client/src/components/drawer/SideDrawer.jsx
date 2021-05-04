import React from 'react'
import { Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import placeholder from '../../images/placeholder.png'

const SideDrawer = () => {
    const { drawer, cart } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch({
            type: 'SET_DRAWER',
            payload: false
        })
    }

    const imageStyle = {
        width: '100%',
        height: '100px',
        objectFit: 'cover'
    }

    return (
        <Drawer
            title={`Cart / ${cart.length} Product`}
            visible={drawer}
            onClose={handleClose}
        >
            <div className="row">
                <div className="col">
                    {cart.map(p => (
                        <React.Fragment key={p._id}>
                            <img
                                src={p.images[0]
                                    ? p.images[0].url
                                    : placeholder
                                }
                                style={imageStyle}
                            />
                            <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <Link to="/cart">
                <button
                    className="text-center btn btn-primary btn-raised btn-block"
                    onClick={() =>
                        dispatch({
                            type: 'SET_DRAWER',
                            payload: false
                        })
                    }
                >
                    Go To Cart
                </button>
            </Link>
        </Drawer>
    )
}

export default SideDrawer
