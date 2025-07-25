import React from "react";
import "./ProductsPage.css";
import ProductsSidebar from "./ProductsSidebar";
import ProductList from "./ProductList";
const ProductsPage = () => {
  return (
    <section className="products_page">
      <ProductsSidebar />
      <ProductList />
    </section>
  );
};

export default ProductsPage;
