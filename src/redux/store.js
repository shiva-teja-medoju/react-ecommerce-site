import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import searchReducer from './searchSlice';


const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        search : searchReducer
    },
});

export default store;
