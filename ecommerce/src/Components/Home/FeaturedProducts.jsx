import React from "react";
import "./FeaturedProducts.css";
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
      <h2>Featured Products</h2>
      <div className="align_center featured_products_list">
        {/* <ProductCard />
        <ProductCard />
        <ProductCard /> */}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}

        {!isLoading && error ? (
          <em className="form_error">{error}</em>
        ) : Array.isArray(data) ? (
          data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>Loading or no products found.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
