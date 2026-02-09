
import {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from "../../redux/cartSlice";
import './Products.css'
import LoadingSpinner from "./LoadingSpinner";


// Helper to sanitize images (fixes API issues with stringified images)
const sanitizeImages = (images) => {
  if (!Array.isArray(images)) return [];
  return images.map(img => {
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
};

function ProductsSection() {
  const [products, setProducts] = useState(() => {
    const cachedData = localStorage.getItem('products_cache_v2');
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const [loading, setLoading] = useState(() => !localStorage.getItem('products_cache_v2'));
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search?.searchTerm || "");

  useEffect(() => {

    if (products.length > 0) return;
    async function fetchData() {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=50');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData = await response.json();
        const result = rawData.map(product => ({
          ...product,
          images: sanitizeImages(product.images)
        }));

        const allCategories = [...new Set(result.map(product => product.category.name))];
        console.log("All available categories from the API:", allCategories);
        let productsToDisplay = result.filter(product => Array.isArray(product.images) && product.images.length > 0);

        for (let i = productsToDisplay.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [productsToDisplay[i], productsToDisplay[j]] = [productsToDisplay[j], productsToDisplay[i]];
        }
        setProducts(productsToDisplay);
        localStorage.setItem('products_cache_v2', JSON.stringify(productsToDisplay));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []); 

  if (loading) return <div className="loading"><LoadingSpinner /></div>;
  if (error) return <div>Error: {error}</div>;


  const filteredProducts = products.filter((product) => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (product) => {
    dispatch(addToCart(product));
    toast.success("Item added to cart");
  };


  return (
    <>
    <ToastContainer position="bottom-right" />
    <div className="Product-container">
      <h1 className="product-title">All Products</h1>
      <div className="pro-section">
       {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
             <Link 
             to={`/product/${product.id}`} 
             className="product-link"
             state={{product}}>
              <img src={product.images[0]} alt={product.title} className="product-image" loading="lazy" decoding="async" />
              </Link>
              <h4 className="product-name">{product.title}</h4>
              <div className="product-details">
                 <p className="product-price">${product.price}</p>
                 <button className="add-to-cart-button" onClick={() => handleAddProduct(product)}>Add to Cart</button>
              </div> 
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
    </>
  );
}
export default  ProductsSection;