import React from 'react';

import Jumbotron from '../../components/cards/Jumbotron';
import BestSellers from '../../components/home/BestSellers';
import NewArrivals from '../../components/home/NewArrivals';

const Home = () => {
    return (
        <>
            <div className="jumbotron text-danger text-center font-weight-bold h1">
                <Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
            </div>
            <h4 className="text-center p-3 my-5 display-4 jumbotron">
                New Arrivals
            </h4>
            <NewArrivals />
            <h4 className="text-center p-3 my-5 display-4 jumbotron">
                Best Sellers
            </h4>
            <BestSellers />
        </>
    )
}

export default Home;
