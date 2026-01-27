import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, setShowCart, clearCart } from "../../redux/cartSlice";
import './Cart.css'

const CartItem = () =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { itemList: cartItems, totalAmount } = useSelector((state) => state.cart);

  const handleCheckout = () => {
    dispatch(setShowCart(false));
    navigate('/checkout');
  };
  
  return (
    <div className="cart-overlay" onClick={() => dispatch(setShowCart())}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">Your Cart</h2>
          <button className="close-btn" onClick={() => dispatch(setShowCart())}>&times;</button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <h2>Cart is Empty</h2>
           ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <p>
                    {item.quantity} x ${item.price}
                  </p>
                </div>
                <div className="cart-item-quantity-controls">
                  <button onClick={() => dispatch(addToCart(item))}>+</button>
                  <button onClick={() => dispatch(removeFromCart(item))}>-</button>
                </div>
                <p></p>
              </div>
            )
          )
          )}
        </div>
        <div>
         
         <div className="cart-footer">
           <div><h3 className="cart-total">Total: ${totalAmount.toFixed(2)}</h3></div>
           <button 
             className="checkout-btn" 
             onClick={handleCheckout} 
             disabled={cartItems.length === 0}
           >Proceed to Checkout</button>
         </div>
         <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
