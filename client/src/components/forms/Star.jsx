import React from 'react'
import StarRatings from 'react-star-ratings'

const Star = ({ starsNumber, onStarClick, activeStar }) => {
    return (
        <>
            <StarRatings
                changeRating={() => onStarClick(starsNumber)}
                starEmptyColor={activeStar === starsNumber ? "red" : "#cbd3e3"}
                starHoverColor="red"
                numberOfStars={starsNumber}
                starDimension="20px"
                starSpacing="2px"
            />
            <br />
        </>
    )
}

export default Star
