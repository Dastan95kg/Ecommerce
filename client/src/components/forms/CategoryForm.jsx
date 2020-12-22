import React from 'react'

const CategoryForm = ({ handleSubmit, categoryName, setCategoryName }) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group d-flex flex-column">
            <label>Name</label>
            <input
                type="text"
                placeholder="Type a name of category"
                className="form-control"
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
                autoFocus
                required
            />
        </div>
        <button
            type="submit"
            className="btn btn-outline-primary"
            disabled={categoryName.trim().length < 2}
        >
            Save
            </button>
    </form>
)

export default CategoryForm
