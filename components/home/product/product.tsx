"use client";
import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/api.js";
import styles from "./product.module.css";
// import { Client } from '@vercel/postgres';

interface ProductData {
  ID: number;
  source: string;
  brand: string;
  name: string;
  price: number;
}

function numberWithCommas(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function Products() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log("Fetched products:", data); // Log the fetched data
        setProducts(data.Data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className={styles.product}>
      {loading ? (
        <>
          <div
            className={styles["container-product-title-skeleton"]}
            id='skeleton'></div>
          <div className={styles["product-wrapper-skeleton"]}>
            <div
              className={styles["product-item-skeleton"]}
              id='skeleton'></div>
            <div
              className={styles["product-item-skeleton"]}
              id='skeleton'></div>
            <div
              className={styles["product-item-skeleton"]}
              id='skeleton'></div>
            <div
              className={styles["product-item-skeleton"]}
              id='skeleton'></div>
            <div
              className={styles["product-item-skeleton"]}
              id='skeleton'></div>
            <div
              className={styles["product-item-skeleton"]}
              id='skeleton'></div>
            <div
              className={styles["product-item-skeleton"]}
              id='skeleton'></div>
            <div
              className={styles["product-item-skeleton"]}
              id='skeleton'></div>
          </div>
        </>
      ) : (
        <>
          <section className={styles["container-product-title"]}>
            Produk Pilihan dari Brand Populer
          </section>

          <div className={styles["product-wrapper"]}>
            {Array.isArray(products) ? (
              products.map((product) => (
                <div className={styles["product-items"]} key={product.ID}>
                  <a className={styles["product-items-image"]} href='/'>
                    <img src={product.source} alt={product.name} />
                  </a>
                  <div className={styles["products-details"]}>
                    <a href='/ '>
                      {" "}
                      {/* Ganti product.source */}
                      <div className={styles.brand}>{product.brand}</div>
                      <div className={styles.name}>{product.name}</div>
                      <div className={styles.price}>
                        Rp {numberWithCommas(product.price)}
                      </div>
                    </a>
                  </div>
                  <button className='button'>Add to Cart</button>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
