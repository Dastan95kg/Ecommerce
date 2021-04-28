import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getSubs } from '../../functions/sub'

const SubList = () => {
    const [subs, setSubs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getSubs()
            .then(res => {
                setSubs(res.data)
            })
            .finally(() => setLoading(false))
    }, [])

    const showSubs = () => subs.map(s => (
        <Link
            key={s._id}
            className="btn btn-raised btn-outlined-primary btn-lg btn-block m-3 col text-info"
            to={`/sub/${s.slug}`}
        >
            {s.name}
        </Link>
    ))

    return (
        <div className="container pb-5">
            <div className="row">
                {loading ? <div className="text-center">Loading...</div> : showSubs()}
            </div>
        </div>
    )
}

export default SubList
