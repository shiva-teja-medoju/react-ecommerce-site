import React, { useState, useEffect } from "react";
import "../../App.css";
import Navbar from "../components/Navbar";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProductsNotFound } from "./ProductsNotFound";
import LoadingSpinner from "../components/LoadingSpinner";

// --- Interfaces for the external API ---
interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category?: Category | null;
}

const FurnitureSection: React.FC = () => {
  // State to store the fetched data, loading status, and any errors.
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Define the async function to fetch data inside useEffect
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products?offset=0&limit=50"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = (await response.json()) as unknown as Product[];

        // Filter for "Furniture" and ensure the product has valid images.
        const FurnitureProducts = result.filter(
          (product) =>
            product.category?.name === "Furniture" &&
            Array.isArray(product.images) &&
            product.images.length > 0
        );
        console.log(FurnitureProducts);
        setProducts(FurnitureProducts);
      } catch (e: unknown) {
        setError((e as Error)?.message ?? String(e));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // The empty dependency array [] ensures this effect runs only once when the component mounts.

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  // Render the fetched data
  return (
    <>
    <Navbar />
      <div className="product-container">
      <h1 className="product-title">Furniture</h1>
      <div className="pro-section">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="product-image"
                />
              </Link>
              <h4>{product.title}</h4>
              <div className="product-details">
                 <p className="product-price">${product.price}</p>
                 <button onClick={() => dispatch(addToCart(product))} className="add-to-cart-button">
                   Add to Cart
                 </button>
              </div>
            </div>
          ))
        ) : (
          <p><ProductsNotFound /></p>
        )}
      </div>
    </div>
    </>
  );
};
export default FurnitureSection;