import { combineReducers } from 'redux';

import userReducer from './userReducer';
import searchReducer from './searchReducer';
import cartReducer from './cartReducer';
import drawerReducer from './drawerReducer';
import couponReducer from './couponReducer';
import CODreducer from './CODreducer';

export default combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    coupon: couponReducer,
    COD: CODreducer
})