import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import App from './App';

// Mock reducers to satisfy Navbar's useSelector dependencies
const mockCartReducer = (state = { itemList: [], totalQuantity: 0, showCart: false }, action) => state;
const mockAuthReducer = (state = { user: null }, action) => state;
const mockSearchReducer = (state = { searchTerm: '' }, action) => state;

// Create a mock store
const store = configureStore({
  reducer: {
    cart: mockCartReducer,
    auth: mockAuthReducer,
    search: mockSearchReducer,
  },
});

describe('App Component', () => {
  it('renders the Navbar and main content', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Check if the logo is rendered (from Navbar)
    const logoElement = screen.getByText(/AURA/i);
    expect(logoElement).toBeTruthy();

    // Check if the tagline is rendered (from Navbar)
    const taglineElement = screen.getByText(/Where your aesthetic comes true/i);
    expect(taglineElement).toBeTruthy();
  });
});
