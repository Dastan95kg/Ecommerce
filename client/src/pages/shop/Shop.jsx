import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Radio, Slider } from 'antd'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons'

import { getProductsCount, fetchProductsByFilter } from '../../functions/product'
import ProductCard from '../../components/cards/ProductCard'
import { getCategories } from '../../functions/category'
import { getSubs } from '../../functions/sub'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import Star from '../../components/forms/Star'

const { Item, SubMenu } = Menu

const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState()
    const [ok, setOk] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [star, setStar] = useState('')
    const [subs, setSubs] = useState([])
    const [sub, setSub] = useState('')
    const [brands, setBrands] = useState(['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'])
    const [brand, setBrand] = useState('')
    const [colors, setColors] = useState(['Black', 'Brown', 'Silver', 'White', 'Blue'])
    const [color, setColor] = useState('')
    const [shipping, setShipping] = useState('')

    const { text } = useSelector(state => state.search)

    const dispatch = useDispatch()

    // 1. load products by default on page load
    useEffect(() => {
        loadProducts()

        getCategories().then(res => setCategories(res.data))

        getSubs().then(res => setSubs(res.data))
    }, [])

    const loadProducts = () => {
        setLoading(true)
        getProductsCount(12)
            .then(res => setProducts(res.data))
            .finally(() => setLoading(false))
    }

    // 2. load products on search input
    useEffect(() => {
        if (text.trim()) {
            const delayed = setTimeout(() => {
                fetchProducts({ query: text })
            }, 800)

            return () => clearTimeout(delayed)
        }
    }, [text])

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg)
            .then(res => setProducts(res.data))
    }

    // 3. load products on price change
    const handleSlider = (value) => {
        // reset other filter data
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setSelectedCategories([])
        setStar('')
        setSub('')
        setBrand('')
        setColor('')
        setShipping('')

        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 800)
    }

    useEffect(() => {
        fetchProducts({ price })
    }, [ok])

    // 4. load products based on choosing categories
    const handleCheck = (e) => {
        // reset other filter data
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setPrice([0, 0])
        setStar('')
        setSub('')
        setBrand('')
        setColor('')
        setShipping('')

        const arr = [...selectedCategories]
        const elem = e.target.value
        const elemIndex = arr.indexOf(elem)

        if (elemIndex === -1) {
            arr.push(elem)
        } else {
            arr.splice(elemIndex, 1)
        }

        setSelectedCategories(arr)
        fetchProducts({ category: arr })
    }

    // 5. load products by rating
    const handleStarClick = (num) => {
        // reset other filter data
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setPrice([0, 0])
        setSelectedCategories([])
        setSub('')
        setBrand('')
        setColor('')
        setShipping('')

        setStar(num)
        fetchProducts({ stars: num })
    }

    const showStars = () => (
        <>
            <Star starsNumber={5} onStarClick={handleStarClick} activeStar={star} />
            <Star starsNumber={4} onStarClick={handleStarClick} activeStar={star} />
            <Star starsNumber={3} onStarClick={handleStarClick} activeStar={star} />
            <Star starsNumber={2} onStarClick={handleStarClick} activeStar={star} />
            <Star starsNumber={1} onStarClick={handleStarClick} activeStar={star} />
        </>
    )

    // 6. load products by subs
    const showSubs = () => subs.map(s => (
        <div
            key={s._id}
            className={`p-1 m-1 badge badge-${sub === s ? 'info' : 'secondary'}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleSub(s)}
        >
            {s.name}
        </div>
    ))

    const handleSub = (sub) => {
        // reset other filter data
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setPrice([0, 0])
        setSelectedCategories([])
        setStar('')
        setBrand('')
        setColor('')
        setShipping('')

        setSub(sub)
        fetchProducts({ sub })
    }

    // 7. load products by brand
    const showBrands = () => brands.map(b => (
        <>
            <Radio
                key={b}
                name={b}
                value={b}
                onChange={handleBrand}
                checked={b === brand}
            >
                {b}
            </Radio>
            <br />
        </>
    ))

    const handleBrand = (e) => {
        // reset other filter data
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setPrice([0, 0])
        setSelectedCategories([])
        setStar('')
        setSub('')
        setColor('')
        setShipping('')

        setBrand(e.target.value)
        fetchProducts({ brand: e.target.value })
    }

    // 8. load products by color
    const showColors = () => colors.map(c => (
        <>
            <Radio
                key={c}
                name={c}
                value={c}
                onChange={handleColor}
                checked={c === color}
            >
                {c}
            </Radio>
            <br />
        </>
    ))

    const handleColor = (e) => {
        // reset other filter data
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setPrice([0, 0])
        setSelectedCategories([])
        setStar('')
        setSub('')
        setBrand('')
        setShipping('')

        setColor(e.target.value)
        fetchProducts({ color: e.target.value })
    }

    // 9. load products by shipping
    const showShipping = () => (
        <>
            <Checkbox
                value='Yes'
                onChange={handleShipping}
                className="my-1"
                checked={shipping === 'Yes'}
            >
                Yes
            </Checkbox>
            <br />
            <Checkbox
                value='No'
                onChange={handleShipping}
                className="my-1"
                checked={shipping === 'No'}
            >
                No
            </Checkbox>
        </>
    )

    const handleShipping = (e) => {
        // reset other filter data
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setPrice([0, 0])
        setSelectedCategories([])
        setStar('')
        setSub('')
        setBrand('')
        setColor('')

        setShipping(e.target.value)
        fetchProducts({ shipping: e.target.value })
    }

    return (
        <div className="container-fluid">
            <div className="row mt-2">
                <div className="col-md-3">
                    <h4>Search/Filter</h4>
                    <hr />

                    <Menu
                        mode="inline"
                        defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
                    >
                        <SubMenu
                            key="1"
                            title={
                                <span className="h6">
                                    <DollarOutlined /> Price
                                </span>
                            }
                        >
                            <div>
                                <Slider
                                    range
                                    max="100000"
                                    className="mx-4"
                                    tipFormatter={v => `$${v}`}
                                    value={price}
                                    onChange={handleSlider}
                                />
                            </div>
                        </SubMenu>

                        <SubMenu
                            key="2"
                            title={
                                <span className="h6">
                                    <DownSquareOutlined /> Category
                                </span>
                            }
                        >
                            {categories.map(c => (
                                <div key={c._id}>
                                    <Checkbox
                                        className="pb-2 px-4"
                                        value={c._id}
                                        name="category"
                                        onChange={handleCheck}
                                        checked={selectedCategories.includes(c._id)}
                                    >
                                        {c.name}
                                    </Checkbox>
                                </div>
                            ))}
                        </SubMenu>

                        <SubMenu
                            key="3"
                            title={
                                <span className="h6">
                                    <StarOutlined /> Rating
                                </span>
                            }
                        >
                            <div className="pb-2 px-4">{showStars()}</div>
                        </SubMenu>

                        <SubMenu
                            key="4"
                            title={
                                <span className="h6">
                                    <DownSquareOutlined /> Sub Categories
                                </span>
                            }
                        >
                            <div className="pb-2 px-4">{showSubs()}</div>
                        </SubMenu>

                        <SubMenu
                            key="5"
                            title={
                                <span className="h6">
                                    <DownSquareOutlined /> Brands
                                </span>
                            }
                        >
                            <div className="pb-2 px-4">{showBrands()}</div>
                        </SubMenu>

                        <SubMenu
                            key="6"
                            title={
                                <span className="h6">
                                    <DownSquareOutlined /> Colors
                                </span>
                            }
                        >
                            <div className="pb-2 px-4">{showColors()}</div>
                        </SubMenu>

                        <SubMenu
                            key="7"
                            title={
                                <span className="h6">
                                    <DownSquareOutlined /> Shipping
                                </span>
                            }
                        >
                            <div className="pb-2 px-4">{showShipping()}</div>
                        </SubMenu>
                    </Menu>
                </div>

                <div className="col-md-9">
                    <h4 className="text-danger">{loading ? 'Loading...' : 'Products'}</h4>
                    <div className="row">
                        {products.length ? products.map(product => (
                            <div
                                className="col-md-4"
                                key={product.id}
                            >
                                <ProductCard
                                    product={product}
                                />
                            </div>
                        )) : (
                            <div>Products no found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
