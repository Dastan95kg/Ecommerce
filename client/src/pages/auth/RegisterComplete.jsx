import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { auth } from '../../firebase';
import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        setEmail(localStorage.getItem('emailForRegistration'))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error('Email and password were not provided')
            return
        }

        if (password.length < 6) {
            toast.error('Password length should be at least 6 characters long')
            return
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href)
            console.log(result);

            if (result.user.emailVerified) {
                localStorage.removeItem('emailForRegistration')
                // get user id token
                const user = auth.currentUser
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()

                createOrUpdateUser(idTokenResult.token)
                    .then(res => {
                        const { data } = res
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
                    })
                    .catch(err => console.log(err))

                history.push('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const registerCompleteForm = () => <form onSubmit={handleSubmit}>
        <input
            disabled
            type="email"
            value={email}
            className="form-control mb-2"
        />
        <input
            autoFocus
            type="password"
            value={password}
            placeholder="Password"
            className="form-control mb-2"
            onChange={e => setPassword(e.target.value)}
        />
        <button
            type="submit"
            className="btn btn-raised"
        >
            Complete Registration
        </button>
    </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {registerCompleteForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete;
