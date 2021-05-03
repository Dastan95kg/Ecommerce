import React from 'react'
import { Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

const SideDrawer = ({ children }) => {
    const { drawer } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch({
            type: 'SET_DRAWER',
            payload: false
        })
    }

    return (
        <Drawer title="Cart" visible={drawer} onClose={handleClose}>{children}</Drawer>
    )
}

export default SideDrawer
