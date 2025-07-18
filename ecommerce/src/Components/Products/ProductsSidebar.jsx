import React from "react";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import "./ProductsSidebar.css";
import useData from "../../Hooks/useData";

const ProductsSidebar = () => {
  const { data: categories, error } = useData("/category");
  return (
    <aside className="products_sidebar">
      <h3>Category</h3>
      <div className="category_links">
        {error && <em className="form_error">{error}</em>}
        {categories &&
          categories.map((category) => (
            <LinkWithIcon
              key={category._id}
              title={category.name}
              link={`/products?category=${category.name}`}
              emoji={`http://localhost:5000/category/${category.image}`}
              sidebar={true}
            />
          ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
