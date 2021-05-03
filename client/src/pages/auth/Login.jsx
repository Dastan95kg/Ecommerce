import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { auth, googleAuthProvider } from '../../firebase';
import { createOrUpdateUser } from '../../functions/auth';

const Login = ({ history }) => {
    const [email, setEmail] = useState('dastan.maratov95@gmail.com')
    const [password, setPassword] = useState('123456')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const { user } = useSelector(state => state)

    useEffect(() => {
        const intended = history.location.state
        if (intended) {
            return
        } else {
            user && user.token && history.push('/')
        }
    }, [user])

    const roleBasedRedirect = (data) => {
        // intended page
        debugger
        const intended = history.location.state
        if (intended) {
            history.push(intended.from)
        } else {
            if (data.role === 'admin') {
                history.push('/admin/dashboard')
            } else {
                history.push('/user/history')
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { user } = await auth.signInWithEmailAndPassword(email, password)
            const idTokenResult = await user.getIdTokenResult()

            createOrUpdateUser(idTokenResult.token)
                .then(res => {
                    const { data } = res
                    setLoading(false)
                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: {
                            name: data.name,
                            email: data.email,
                            role: data.role,
                            _id: data._id,
                            token: idTokenResult.token
                        }
                    })
                    roleBasedRedirect(data)
                })
                .catch(err => {
                    setLoading(false)
                    toast.error(err.message)
                    console.log(err)
                })

            // history.push('/')
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    const googleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { user } = await auth.signInWithPopup(googleAuthProvider)
            const idTokenResult = await user.getIdTokenResult()

            createOrUpdateUser(idTokenResult.token)
                .then(res => {
                    const { data } = res
                    setLoading(false)
                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: {
                            name: data.name,
                            email: data.email,
                            role: data.role,
                            _id: data._id,
                            token: idTokenResult.token
                        }
                    })
                    roleBasedRedirect(data)
                })
                .catch(err => {
                    setLoading(false)
                    toast.error(err.message)
                    console.log(err)
                })

            // history.push('/')
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    const loginForm = () => <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input
                type="email"
                value={email}
                className="form-control"
                placeholder="Your email"
                onChange={e => setEmail(e.target.value)}
                autoFocus
            />
        </div>
        <div className="form-group">
            <input
                type="password"
                value={password}
                className="form-control"
                placeholder="Your password"
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        <Button
            type="primary"
            shape="round"
            size="large"
            htmlType="submit"
            icon={<MailOutlined />}
            className="mb-3"
            disabled={!email || password.length < 6}
            onClick={handleSubmit}
            block
        >
            Login with Email/Password
        </Button>
        <Button
            type="primary"
            shape="round"
            size="large"
            htmlType="submit"
            icon={<GoogleOutlined />}
            className="mb-3"
            onClick={googleLogin}
            block
            danger
        >
            Login with Google
        </Button>
        <Link
            className="float-right text-danger"
            to="/forgot/password"
        >
            Forgot Password?
        </Link>
    </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>Login</h4>
                    )}
                    {loginForm()}
                </div>
            </div>
        </div >
    )
}

export default Login;
