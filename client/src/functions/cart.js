import axios from 'axios'

export const saveUserCart = async (cart, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart`,
        { cart },
        { headers: { authtoken } }
    )

export const getUserCart = async (authtoken) =>
    await axios.get(
        `${process.env.REACT_APP_API}/user/cart`,
        { headers: { authtoken } }
    )