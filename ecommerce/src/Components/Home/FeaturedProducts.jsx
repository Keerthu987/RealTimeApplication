import React from "react";
import "./FeaturedProducts.css";
import { motion } from "framer-motion";

import ProductCard from "./ProductCard";
import useData from "./../../Hooks/useData";
// import ProductCardSkeleton from "./ProductCard/ProductCardSkeleton"
import ProductCardSkeleton from "./../Products/ProductCardSkeleton";
const FeaturedProducts = () => {
  const skeletons = [1, 2, 3];

  const { data, error, isLoading } = useData(
    "/products/featured",
    null,
    ["products", "featured"],
    10 * 60 * 60 * 1000
  );
  // console.log(data);
  return (
    <section className="featured_products">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Featured Products
      </motion.h2>
      <div className="align_center featured_products_list">
        {/* <ProductCard />
        <ProductCard />
        <ProductCard /> */}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}

        {!isLoading && error ? (
          <em className="form_error">{error}</em>
        ) : Array.isArray(data) ? (
          data.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            >
              <ProductCard key={product._id} product={product} />
            </motion.div>
          ))
        ) : (
          <p>Loading or no products found.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
