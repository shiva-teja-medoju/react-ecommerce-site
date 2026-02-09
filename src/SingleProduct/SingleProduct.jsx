import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../stores/components/Navbar';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SingleProduct.css';

// Helper to sanitize product data (fixes API issues with stringified images)
const sanitizeProduct = (data) => {
  if (!data) return null;
  let cleanData = { ...data };

  // Handle case where images array is returned as a string
  if (typeof cleanData.images === 'string') {
    try {
      cleanData.images = JSON.parse(cleanData.images);
    } catch (e) {
      cleanData.images = [];
    }
  }

  // Handle case where URLs inside the array are double-stringified (e.g. "['url']")
  if (Array.isArray(cleanData.images)) {
    cleanData.images = cleanData.images.map(img => {
      if (typeof img === 'string' && (img.startsWith('["') || img.startsWith("['"))) {
        try {
          const parsed = JSON.parse(img.replace(/'/g, '"'));
          return Array.isArray(parsed) ? parsed[0] : img;
        } catch (e) {
          return img.replace(/\["|"]/g, '').replace(/\['|']/g, '');
        }
      }
      return img;
    });
  }
  return cleanData;
};

function SingleProduct() {
  const { id } = useParams();
  console.log("Products ID received: ", id)
  const location = useLocation();
  const navigate = useNavigate();
  
  // Memoize preloaded product to prevent unnecessary re-renders and sanitize it
  const preloadedProduct = useMemo(() => 
    sanitizeProduct(location.state?.product), 
    [location.state?.product]
  );

  const dispatch = useDispatch();

  const [product, setProduct] = useState(preloadedProduct);
  const [selectedImage, setSelectedImage] = useState(preloadedProduct?.images?.[0] || null);
  const [loading, setLoading] = useState(!preloadedProduct);
  const [error, setError] = useState(null);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Item added to cart");
  };

 useEffect(() => {
  // If we have preloaded data for the CURRENT id, use it immediately
  if (preloadedProduct && String(preloadedProduct.id) === String(id)) {
    setProduct(preloadedProduct);
    setSelectedImage(preloadedProduct.images?.[0]);
    setLoading(false);
    return;
  }

  const fetchProductData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${encodeURIComponent(id)}`
      );

      if (!response.ok) {
        throw new Error("Product not found in API");
      }

      const data = await response.json();

      const cleanData = sanitizeProduct(data);

      if (!Array.isArray(cleanData.images)) {
        throw new Error("Invalid product data");
      }

      setProduct(cleanData);
      setSelectedImage(cleanData.images?.[0]);
    } catch (err) {
      console.error("Fetch failed:", err.message);
      setError("Product unavailable");
    } finally {
      setLoading(false);
    }
  };

  fetchProductData();
 }, [id, preloadedProduct]);



  if (loading) {
    return (
      <>
        <Navbar />
        <p style={{ textAlign: "center", marginTop: "50px" }}>Loading product...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <p style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
          Error: {error}
        </p>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>Back to Home</Link>
        </div>
      </>
    );
  }

  // FINAL GUARD — prevents your exact crash
  if (!product || !Array.isArray(product.images)) {
    return (
      <>
        <Navbar />
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          Invalid product data.
        </p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ToastContainer position="bottom-right" />

      <div className="product-detail-page">
        {/* IMAGE GALLERY */}
        <div className="product-gallery">
          <div className="main-image-container">
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product.title}
                className="single-image"
              />
            )}
          </div>

          <div className="thumbnail-container">
            {product.images?.map((image, index) => (
              <div
                key={index}
                className={`thumbnail-item ${
                  image === selectedImage ? "active" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`${product.title} thumbnail ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="single-product-details">
          <p className="product-category">
            {product.category?.name || "Unknown Category"}
          </p>

          <h1 className="single-title">{product.title}</h1>
          <h2 className="single-price">${product.price}</h2>
          <p className="single-des">{product.description}</p>

          <div style={{ display: "flex", gap: "20px" }}>
            <button
              className="single-button"
              onClick={() => handleAddToCart(product)}
            >
              🛒 Add to Cart
            </button>
            <button
              className="single-button back-button"
              onClick={() => navigate(-1)}
            >
              ⬅ Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
