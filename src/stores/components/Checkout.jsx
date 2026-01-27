import React from 'react';

import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../../redux/cartSlice';
import './Checkout.css';
import Navbar from './Navbar';

const Checkout = () => {
  const { itemList: cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    toast.success("Order Received Successfully!");
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page-container empty-checkout">
        <Navbar />
        <h2>Your Order Placed Successfully!</h2>
        <Link to="/" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
        <Navbar />
      <div className="checkout-form-container">
        <h2>Shipping & Payment</h2>
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your full name" required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Shipping Address</label>
            <input type="text" id="address" placeholder="123 Aura Lane" required />
          </div>
          <div className="form-group">
            <label htmlFor="card">Credit Card Number</label>
            <input type="text" id="card" placeholder="**** **** **** ****" required />
          </div>
          <button type="submit" className="place-order-btn">Place Order</button>
        </form>
      </div>

      <div className="order-summary-container">
        <h2>Order Summary</h2>
        <div className="order-items">
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <img src={item.image} alt={item.name} className="summary-item-image" />
              <div className="summary-item-details">
                <span className="summary-item-name">{item.name} (x{item.quantity})</span>
                <span className="summary-item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="summary-total">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
