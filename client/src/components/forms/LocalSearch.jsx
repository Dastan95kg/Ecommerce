import React from 'react'

const LocalSearch = ({ keyword, setKeyword }) => {
    const handleSearchChange = (e) => {
        setKeyword(e.target.value.toLowerCase())
    }

    return (
        <input
            type="search"
            className="form-control mb-4"
            placeholder="Filter"
            value={keyword}
            onChange={handleSearchChange}
        />
    )
}

export default LocalSearch
