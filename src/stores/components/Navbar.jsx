import { useState } from "react";
import { toast } from "react-toastify";
import logoImg from '../../assets/AURA-logo.png';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowCart } from "../../redux/cartSlice";
import { setSearchTerm } from "../../redux/searchSlice";
import CartItem from "./Cart";
import { Signup } from "../../signup/Signup";
import { Login } from "../../signup/Login";
import { clearUser } from "../../redux/authSlice";
import './Navbar.css'


const Navbar = () => {
    const dispatch = useDispatch();
    const { showCart, totalQuantity } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

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

    return(
        <div className="header-wrapper">
            <div className="navbar">
               <Link to={'/'} className="logo-link">
                <div className="logo-container-wrapper">
                    <div className="logo-container">
                        <img src={logoImg} alt="AURA brand logo" className="logo-image" />
                        <h2 className="logo">AURA</h2>
                    </div>
                    <p className="tagline">Where your aesthetic comes true</p>
                </div>
               </Link>
    
                <div className="search">
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search Aura.in"
                        onChange={handleSearch} 
                    />
                </div>
    
                {user ? (
                    <div className="user-info">
                        <span className="user-name">Hello, {user.name}</span>
                        <button className="signup-btn" onClick={() => dispatch(clearUser())}>Logout</button>
                    </div>
                ) : (
                    <div className="signup-button">
                        <button className="signup-btn" onClick={() => setShowSignup(true)}>Signup</button>
                    </div>
                )}

                <button className="Cart-btn" onClick={handleOpenCart}>
                    Cart {totalQuantity > 0 && `(${totalQuantity})`}
                </button>
                {showCart && <CartItem />}
                {showSignup && <Signup onClose={() => setShowSignup(false)} onSwitchToLogin={handleSwitchToLogin} />}
                {showLogin && <Login onClose={() => setShowLogin(false)} />}
    
            </div>
            <div className="nav-links">
                <ul className="nav-items">

                    <li>
                      <button className="nav-button">
                        <Link to={'/'}>Home</Link>
                      </button>
                    </li>

                    <li>
                      <button className="nav-button">
                        <Link to='/clothes'>Clothes</Link>
                      </button>
                    </li>

                    <li>
                      <button className="nav-button">
                        <Link to= '/electronics'>Electronics</Link>
                      </button>
                    </li>

                    <li>
                     <button className="nav-button">
                         <Link to = '/furniture'>Furniture</Link>
                     </button>
                    </li>

                    <li>
                      <button className="nav-button">
                        <Link to = '/shoes'>Shoes</Link>
                      </button>
                    </li>

                    <li>
                      <button className="nav-button">
                        <Link to = '/miscellaneous'>Miscellaneous</Link>
                      </button>
                    </li>

                </ul>
            </div>
        </div>
    );
}
export default Navbar;