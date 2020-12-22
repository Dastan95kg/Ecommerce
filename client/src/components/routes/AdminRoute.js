import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'

import LoadingToRedirect from './LoadingToRedirect'
import { currentAdmin } from '../../functions/auth'

const AdminRoute = ({ children, ...rest }) => {
    const [ok, setOk] = useState(false)
    const { user } = useSelector(state => state)

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then(() => {
                    setOk(true)
                })
                .catch(err => {
                    setOk(false)
                })
        }
    }, [user])

    return ok ? (
        <Route {...rest} render={children} />
    ) : (
            <LoadingToRedirect />
        )
}

export default AdminRoute
