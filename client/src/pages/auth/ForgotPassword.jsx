import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { auth } from '../../firebase';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useSelector(state => state)

    useEffect(() => {
        user && user.token && history.push('/')
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        }


        await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('')
                setLoading(false)
                toast.success(`Link for password reset is sent to your email ${email}`)
            })
            .catch(error => {
                setLoading(false)
                toast.error(error.message)
                console.log(error);
            })
    }

    const forgotPasswordForm = () => <form onSubmit={handleSubmit}>
        <input
            type="email"
            value={email}
            className="form-control mb-2"
            placeholder="Your email"
            onChange={e => setEmail(e.target.value)}
            autoFocus
        />
        <button
            type="submit"
            className="btn btn-raised"
            disabled={!email}
        >
            Submit
        </button>
    </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading
                        ? <h4 className="text-danger">Loading...</h4>
                        : <h4>Forgot password</h4>
                    }
                    {forgotPasswordForm()}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
