import React, { useState } from 'react'
import { toast } from 'react-toastify'

import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase'

const Password = () => {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        await auth.currentUser
            .updatePassword(password)
            .then(() => {
                setLoading(false)
                toast.success('Your password is updated')
                setPassword('')
            })
            .catch(err => {
                setLoading(false)
                toast.error(err.message)
            })
    }

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="password__update">Your password</label>
                <input
                    type="password"
                    id="password__update"
                    className="form-control"
                    placeholder="Enter your new password"
                    value={password}
                    disabled={loading}
                    onChange={e => setPassword(e.target.value)}
                    autoFocus
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || password.length < 6 || !password}
                >
                    SUBMIT
                </button>
            </div>
        </form>
    )

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    {loading ? <h4 className="text-danger">Loading</h4> : <h4>Password Update</h4>}
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    )
}

export default Password
