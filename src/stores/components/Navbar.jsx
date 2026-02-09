import { useState } from "react";
import { toast } from "react-toastify";
import Banner from '../../assets/banner.png';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowCart } from "../../redux/cartSlice";
import { setSearchTerm } from "../../redux/searchSlice";
import CartItem from "./Cart";
import { Signup } from "../../signup/Signup";
import { Login } from "../../signup/Login";
import { clearUser } from "../../redux/authSlice";
import './Navbar.css'

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );

const Navbar = () => {
    const dispatch = useDispatch();
    const { showCart, totalQuantity } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const[isDropDownOpen, setIsDropDownOpen] = useState(false)

    const handleSwitchToLogin = () => {
        setShowSignup(false);
        setShowLogin(true);
    };

    const handleSearch = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const handleOpenCart = () => {
        if (!user) {
            toast.warning("Please Login to view Cart");
        } else {
            dispatch(setShowCart());
        }
    };

    const handleAddToCart = () => {
        toast.update("Item added to cart")
    }

    return(
        <div className="header-wrapper">
            <div className="navbar">
                
               <div className="Page-title">
                 <Link to={'/'} className="logo-link">
                 <div className="logo-container-wrapper">
                     <div className="logo-container">
                        <img src={Banner} alt="AURA brand logo" className="logo-image" />
                        <h2 className="logo">AURA</h2>
                     </div>
                     <p className="tagline">Where your aesthetic comes true</p>
                 </div>
                 </Link>
               </div>
    
               <div className="links">

                <Link to = '/'><h4>Home</h4></Link>

                <div className="dropdown-container"
                onMouseEnter={() => setIsDropDownOpen(true)}
                onMouseLeave={()=> setIsDropDownOpen(false)}
                >
                <Link to = {'/products'}><h4>Collection</h4></Link>
                {isDropDownOpen && (
                  <div className="dropdown-menu">
                    <Link to = '/clothes'>Clothes</Link>
                    <Link to = '/shoes'>Shoes</Link>
                    <Link to = '/furniture'>Furniture</Link>
                    <Link to = '/electronics'>Electronics</Link>
                    <Link to = '/miscellaneous'>Miscellaneous</Link>
                  </div>
                )}
                </div>

                <Link><h4>Journal</h4></Link>

                <Link><h4>About</h4></Link>
                
               </div>
    
                <div className="cart-search">
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search..." 
                        onChange={handleSearch} 
                    />
                    {user ? (
                    <div className="user-info">
                        <span className="user-name">Hello, {user.name}</span>
                        <button className="signup-link" onClick={() => dispatch(clearUser())}>Logout</button>
                    </div>
                 ) : (
                    <div className="signup-button">
                        <button className="signup-link" onClick={() => setShowSignup(true)}>Signup</button>
                    </div>
                 )}

                 <div className="cart-container" onClick={handleOpenCart}>
                    <CartIcon />
                    {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
                 </div>
                </div>

                {showCart && <CartItem />}
                {showSignup && <Signup onClose={() => setShowSignup(false)} onSwitchToLogin={handleSwitchToLogin} />}
                {showLogin && <Login onClose={() => setShowLogin(false)} />}
    
            </div>
        </div>
    );
}
export default Navbar;