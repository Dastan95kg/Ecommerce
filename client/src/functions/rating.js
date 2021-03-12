import React from 'react'
import StarRatings from 'react-star-ratings'

const showAverage = (product) => {
    const { ratings } = product
    let totalRatings, result

    if (ratings && ratings.length) {
        totalRatings = ratings.reduce((acc, rating) => rating.star + acc, 0)
        result = totalRatings / ratings.length
    }

    return (
        <div className="text-center">
            <StarRatings
                rating={result}
                starRatedColor="red"
                numberOfStars={5}
                starDimension="25px"
                starSpacing="3px"
            />{" "}
            <span className="ml-2">{`(${ratings.length})`}</span>
        </div>
    )
}

export default showAverage