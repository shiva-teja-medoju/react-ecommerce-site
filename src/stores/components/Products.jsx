
import {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import './Products.css'



function ProductsSection() {
  const [products, setProducts] = useState(() => {
    const cachedData = localStorage.getItem('products_cache');
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const [loading, setLoading] = useState(() => !localStorage.getItem('products_cache'));
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
        const result = await response.json();
        const allCategories = [...new Set(result.map(product => product.category.name))];
        console.log("All available categories from the API:", allCategories);
        let productsToDisplay = result.filter(product => Array.isArray(product.images) && product.images.length > 0);

        for (let i = productsToDisplay.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [productsToDisplay[i], productsToDisplay[j]] = [productsToDisplay[j], productsToDisplay[i]];
        }
        setProducts(productsToDisplay);
        localStorage.setItem('products_cache', JSON.stringify(productsToDisplay));
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


  return (
    <>
        <div className="Product-container">
      <h1 className="product-title">All Products</h1>
      <div className="pro-section">
       {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
             <Link to={`/product/${product.id}`} className="product-link">
              <img src={product.images[0]} alt={product.title} className="product-image" loading="lazy" decoding="async" />
              </Link>
              <h4 className="product-name">{product.title}</h4>
              <div className="product-details">
                 <p className="product-price">${product.price}</p>
                 <button className="add-to-cart-button" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
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