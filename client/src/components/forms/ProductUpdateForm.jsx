import React from 'react'
import { Select } from 'antd'

const { Option } = Select

const ProductUpdateForm = ({ handleChange, handleSubmit, values, setValues, categories }) => {
    const {
        title,
        description,
        price,
        category,
        subs,
        quantity,
        images,
        shipping,
        colors,
        color,
        brands,
        brand
    } = values

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input className="form-control" type="text" value={title} name="title" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input className="form-control" type="text" value={description} name="description" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input className="form-control" type="number" value={price} name="price" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Shipping</label>
                <select name="shipping" className="form-control" onChange={handleChange}>
                    <option>Please select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input className="form-control" type="number" value={quantity} name="quantity" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Color</label>
                <select name="color" className="form-control" onChange={handleChange} value={color}>
                    {colors.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Brand</label>
                <select name="brand" className="form-control" onChange={handleChange} value={brand}>
                    {brands.map(b => (
                        <option key={b} value={b}>{b}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Category</label>
                <select name="category" className="form-control">
                    <option value="">{category ? category.name : 'Please select'}</option>
                    {categories.length > 0 &&
                        categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                </select>
            </div>

            {/* {showSubs && (
                <div className="form-group">
                    <label>Sub Categories</label>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        value={subs}
                        placeholder="Please select"
                        onChange={value => setValues({ ...values, subs: value })}
                    >
                        {subOptions.length && subOptions.map(s => (
                            <Option key={s._id} value={s._id}>{s.name}</Option>
                        ))}
                    </Select>
                </div>
            )} */}

            <button type="submit" className="btn btn-outline-info">Save</button>
        </form>
    )
}

export default ProductUpdateForm
