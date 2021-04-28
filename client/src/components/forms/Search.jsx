import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const Search = () => {
    const { text } = useSelector(state => state.search)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleChange = e => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: e.target.value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/shop?${text}`)
    }

    return (
        <span className="float-right p-1">
            <form
                className="form-inline my-2 my-lg-0"
                onSubmit={handleSubmit}
            >
                <input
                    className="form-control"
                    value={text}
                    onChange={handleChange}
                    placeholder="Search"
                />
                <SearchOutlined
                    style={{ cursor: 'pointer' }}
                    onClick={handleSubmit}
                />
            </form>
        </span>
    )
}

export default Search
