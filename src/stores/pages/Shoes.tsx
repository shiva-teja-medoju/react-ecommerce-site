import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../components/Products.css";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProductsNotFound } from "./ProductsNotFound";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

const sanitizeImages = (images: any[]): string[] => {
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

const ShoesSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const cached = localStorage.getItem("products_cache_v2");
    return cached ? JSON.parse(cached) : [];
  });

  const [loading, setLoading] = useState<boolean>(
    () => !localStorage.getItem("products_cache_v2")
  );

  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success("Item added to cart");
  };

  useEffect(() => {
    if (products.length > 50) return;

    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products?offset=0&limit=200"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData: Product[] = await response.json();

        const result = rawData.map(product => ({
          ...product,
          images: sanitizeImages(product.images)
        }));

        const validProducts = result.filter(
          (p) => Array.isArray(p.images) && p.images.length > 0
        );

        localStorage.setItem(
          "products_cache_v2",
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

  if (loading) return <div className="loading"><LoadingSpinner /></div>;
  if (error) return <div>Error: {error}</div>;

  const shoesProducts = products.filter(
    (p) => p.category?.name.toLowerCase().includes("shoes")
  );

  return (
    <>
      <Navbar />
      <ToastContainer position="bottom-right" />
      <div className="product-container">
        <h1 className="product-title">Shoes</h1>
        <div className="pro-section">
          {shoesProducts.length > 0 ? (
            shoesProducts.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-link" state={{ product }}>
                  <img src={product.images[0]} alt={product.title} className="product-image" loading="lazy" />
                </Link>
                <h4 className="product-name">{product.title}</h4>
                <div className="product-details">
                  <p className="product-price">${product.price}</p>
                  <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
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

export default ShoesSection;