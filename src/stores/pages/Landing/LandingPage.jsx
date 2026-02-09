import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./LandingPage.css";
import frontMan from "../../../assets/frontMan.png";
import clothes from "../../../assets/clothes.png"
import footwear from "../../../assets/footwear.png"
import electronics from "../../../assets/electronics.png"
import furniture from "../../../assets/furniture.png"
import miscellaneous from "../../../assets/miscellaneous.png"
import { FaShieldAlt, FaLeaf, FaTruck, FaShippingFast } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="landing-page">

      <Navbar />

      {/* HERO SECTION */}
      <div className="hero-section">

        <div className="hero-container">
        <div className="hero-text">
          <h1>URBAN AURA</h1>
          <p>
            Defining the future of luxury with sustainable materials
            and timeless design.
          </p>

          <Link to="/products">
            <button className="explore-btn">Redefine Your Style</button>
          </Link>
        </div>

        <div className="hero-image">
          <div className="orange-bg"></div>
          <img src={frontMan} alt="Model" className="front-man-img" />
          {/* <div className="aura-badge">
            <h2>AURA</h2>
            <button className="aura-btn">Explore Now</button>
          </div> */}
        </div>
        </div>

      </div>

      {/* ELEVATE YOUR COLLECTIONS */}
      <div className="elevate-section">
        <h2>Elevate Your Collections</h2>
        {/* <p className="elevate-subtext">
          Elevate your wardrobe with our latest drops.
        </p> */}

        <div className="features-row">

          <div className="feature-item">
            <FaShieldAlt className="feature-icon" />
            <h3>Premium Quality</h3>
            <p>
              Experience the best in fashion
              with our meticulously crafted collections.
            </p>
          </div>

          <div className="divider"></div>

          <div className="feature-item">
            <FaLeaf className="feature-icon" />
            <h3>Sustainable Materials</h3>
            <p>
              Crafted with eco-friendly fabrics
              and responsible production practices.
            </p>
          </div>

          <div className="divider"></div>

          <div className="feature-item">
            <FaTruck className="feature-icon" />
            <h3>Free Shipping</h3>
            <p>
              Enjoy free shipping on all orders
              with easy, hassle-free returns.
            </p>
          </div>

          <div className="divider"></div>

          <div className="feature-item">
            <FaShippingFast className="feature-icon" />
            <h3>Fast Delivery</h3>
            <p>
              Track your orders in real time
              with guaranteed quick delivery.
            </p>
          </div>

        </div>
      </div>

      {/* EXPLORE COLLECTIONS */}
      <div className="products-section">
        <h2>Explore Our Collections</h2>
        {/* <p className="products-subtext">
          Elevate your wardrobe with our latest drops.
        </p> */}

        <div className="products-grid">

          <div className="landing-product">
            <h3>Winter Staples</h3>
            <img src={clothes} alt="lady-img" className="lady-img" />
            <Link to="/clothes">
              <button className="shop-now-btn">Shop Now</button>
            </Link>
          </div>

           <div className="landing-product">
            <h3>Winter Staples</h3>
            <img src={furniture} alt="lady-img" className="lady-img" />
            <Link to="/furniture">
              <button className="shop-now-btn">Shop Now</button>
            </Link>
          </div>

           <div className="landing-product">
            <h3>Winter Staples</h3>
            <img src={miscellaneous} alt="lady-img" className="lady-img" />
            <Link to="/miscellaneous">
              <button className="shop-now-btn">Shop Now</button>
            </Link>
          </div>

          <div className="landing-product">
            <h3>Tech Moderns</h3>
            <img src={electronics} alt="electronics img" />
            <Link to="/electronics">
              <button className="shop-now-btn">Shop Now</button>
            </Link>
          </div>

          <div className="landing-product">
            <h3>Crafted Footwear</h3>
            <img src={footwear} alt="footwear img" />
            <Link to="/shoes">
              <button className="shop-now-btn">Shop Now</button>
            </Link>
          </div>

        </div>
      </div>

      {/* Join our newsletter */}
      <div className="subscription-mock">
          <h2>Join Our Newsletter</h2>
          <p className="para-1">Subscribe to get exclusive offers & other product updates</p>
          <input type="email" 
          className="email-input"
          placeholder="Enter your email address"
          />
          <button className="subscribe">Subscribe</button>
          <p className="para-2">Stay updated with the latest arrivals, exclusive offers, and fashion tips</p>
      </div>

    </div>
  );
};

export default LandingPage;
