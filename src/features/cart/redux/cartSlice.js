import { createSlice } from "@reduxjs/toolkit";

// Defines the initial state for the cart slice.
const initialState = { itemList: [], totalQuantity: 0, showCart: false, totalAmount: 0 };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            // Check if the item already exists in the cart.
            const existingItem = state.itemList.find(
                (item) => item.id === newItem.id,
            );

            // Always increment total quantity and add the price of the new item.
            state.totalQuantity++;
            state.totalAmount += newItem.price;

            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            } else {
                // If the item is new, add it to the itemList array.
                state.itemList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                    image: newItem.images[0],
                });
            }
        },
        removeFromCart(state, action) {
            const findItem = state.itemList.find(
                (item) => item.id === action.payload.id
            );
            if (!findItem) return; // Guard clause: do nothing if item not found

            // Always decrement total quantity and subtract the price.
            state.totalAmount -= findItem.price;
            state.totalQuantity--;

            // If it's the last one, filter it out of the array.
            if (findItem.quantity === 1) {
                state.itemList = state.itemList.filter(
                    (item) => item.id !== action.payload.id
                );
            } else {
                // Otherwise, just decrement the quantity and total price for that item.
                findItem.quantity--;
                findItem.totalPrice -= findItem.price;
            }
        },

        /**
         * Toggles the visibility of the cart modal.
         */
        setShowCart(state) {
            state.showCart = !state.showCart;
        },

        /**
         * Resets the cart to its initial empty state.
         */
        clearCart(state) {
            state.itemList = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
});

// Export the action creators to be used in components.
export const { addToCart, removeFromCart, setShowCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
