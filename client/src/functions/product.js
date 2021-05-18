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

export const removeProduct = async (authtoken, slug) =>
    await axios.delete(
        `${process.env.REACT_APP_API}/product/${slug}`,
        { headers: { authtoken } }
    )

export const getProduct = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)

export const updateProduct = async (slug, product, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/product/${slug}`,
        product,
        { headers: { authtoken } })

export const getHomeProducts = async (sort, order, page) =>
    await axios.post(
        `${process.env.REACT_APP_API}/products`,
        { sort, order, page }
    )

export const getProductsCount = async (number) =>
    await axios.get(`${process.env.REACT_APP_API}/products/${number}`)

export const getProductsTotal = async () =>
    await axios.get(`${process.env.REACT_APP_API}/products/total`)

export const productStar = async (productId, star, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/product/star/${productId}`,
        { star },
        { headers: { authtoken } })

export const productRelated = async (productId) =>
    await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`)

export const fetchProductsByFilter = async (obj) =>
    await axios.post(`${process.env.REACT_APP_API}/search/filters`, obj)

export const addProductToWishlist = async (productId, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/wishlist`,
        { productId },
        { headers: { authtoken } }
    )

export const getWishlist = async (authtoken) =>
    await axios.get(
        `${process.env.REACT_APP_API}/user/wishlist`,
        { headers: { authtoken } }
    )

export const removeProductFromWishlist = async (productId, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
        {},
        { headers: { authtoken } }
    )