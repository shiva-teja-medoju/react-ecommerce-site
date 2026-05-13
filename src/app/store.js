import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/redux/cartSlice';
import authReducer from '../features/auth/redux/authSlice';
import searchReducer from '../features/search/redux/searchSlice';


const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        search : searchReducer
    },
});

export default store;
