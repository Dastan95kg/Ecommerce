import React from 'react'
import { Skeleton, Card } from 'antd'

const LoadingCard = ({ count }) => {
    const displayCards = () => {
        const totalCards = []

        for (let i = 0; i < count; i++) {
            totalCards.push(
                <div className="col-md-4 my-2">
                    <Card>
                        <Skeleton active />
                    </Card>
                </div>
            )
        }

        return totalCards
    }

    return <div className="row">{displayCards()}</div>
}

export default LoadingCard
