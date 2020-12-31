import axios from 'axios'

export const createProduct = async (authtoken, product) =>
    await axios.post(
        `${process.env.REACT_APP_API}/product`,
        product,
        { headers: { authtoken } }
    )

export const removeImage = async (authtoken, public_id) =>
    await axios.post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        { headers: { authtoken } }
    )

export const uploadImages = async (authtoken, uri) =>
    await axios.post(`${process.env.REACT_APP_API}/uploadimages`,
        { image: uri },
        { headers: { authtoken } }
    )

export const getProducts = async (count) =>
    await axios.get(`${process.env.REACT_APP_API}/products/${count}`)