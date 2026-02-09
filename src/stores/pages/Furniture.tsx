import React, { useState, useEffect } from "react";
import "../../App.css";
import Navbar from "../components/Navbar";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProductsNotFound } from "./ProductsNotFound";
import LoadingSpinner from "../components/LoadingSpinner";

// ----- Proper Types -----
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
  const [products, setProducts] = useState<Product[]>(() => {
    const cachedData = localStorage.getItem("products_cache");
    return cachedData ? JSON.parse(cachedData) : [];
  });

  const [loading, setLoading] = useState<boolean>(
    () => !localStorage.getItem("products_cache")
  );

  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Same cache-first logic as Products.jsx
    if (products.length > 0) return;

    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products?offset=0&limit=50"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: Product[] = await response.json();

        const validProducts = result.filter(
          (p) => Array.isArray(p.images) && p.images.length > 0
        );

        localStorage.setItem(
          "products_cache",
          JSON.stringify(validProducts)
        );

        setProducts(validProducts);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  // ---- FILTER FROM SHARED CACHE ----
  const furnitureProducts = products.filter(
    (p) =>
      p.category &&
      typeof p.category.name === "string" &&
      p.category.name.toLowerCase().includes("furniture")
  );

  return (
    <>
      <Navbar />

      <div className="product-container">
        <h1 className="product-title">Furniture</h1>

        <div className="pro-section">
          {furnitureProducts.length > 0 ? (
            furnitureProducts.map((product) => (
              <div key={product.id} className="product-card">
                <Link
                  to={`/product/${product.id}`}
                  className="product-link"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="product-image"
                    loading="lazy"
                  />
                </Link>

                <h4 className="product-name">{product.title}</h4>

                <div className="product-details">
                  <p className="product-price">${product.price}</p>

                  <button
                    className="add-to-cart-button"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <ProductsNotFound />
          )}
        </div>
      </div>
    </>
  );
};

export default FurnitureSection;
