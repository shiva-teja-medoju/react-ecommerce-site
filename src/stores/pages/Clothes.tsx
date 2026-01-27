// ClothesSection.tsx
import React, { useEffect, useState } from "react";
import "../../App.css";
import Navbar from "../components/Navbar";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProductsNotFound } from "./ProductsNotFound";
import LoadingSpinner from "../components/LoadingSpinner";

// --- Interfaces for the external API ---
// Tailor these to the fields you actually use.
interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];            // API returns an array of image URLs
  category?: Category | null;  // category can be missing or null sometimes
  // add other fields you use later (description, etc.)
}

const ClothesSection: React.FC = () => {
  // typed states
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ---- Redux dispatch typing options ----
  // QUICK option (works but less strict):
  const dispatch = useDispatch(); // type is `any` or unknown depending on your tsconfig

  // BETTER option: create a typed hook in your redux store file:
  // export type AppDispatch = typeof store.dispatch;
  // export const useAppDispatch = () => useDispatch<AppDispatch>();
  // then: const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products?offset=0&limit=50"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Tell TS we expect an array of Product (runtime still decides)
        const result = (await response.json()) as unknown as Product[];

        // Filter for Clothes and ensure images exist
        const clothesProducts = result.filter((product) =>
          product?.category?.name === "Clothes" &&
          Array.isArray(product.images) &&
          product.images.length > 0
        );

        setProducts(clothesProducts);
      } catch (e: unknown) {
        // cast to string safely
        setError((e as Error)?.message ?? String(e));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // run once

  if (loading) return <div><LoadingSpinner /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="product-container">
        <h1 className="product-title">Clothes</h1>
        <div className="pro-section">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-link">
                  {/* safe access to images */}
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="product-image"
                  />
                </Link>
                <h4>{product.title}</h4>
                <div className="product-details">
                  <p className="product-price">${product.price}</p>
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="add-to-cart-button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>
              <ProductsNotFound />
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ClothesSection;
