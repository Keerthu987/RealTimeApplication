import React from "react";
import "./ProductList.css";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Home/ProductCard";
import useData from "../../Hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Pagination from "../Common/Pagination";
import { useEffect } from "react";
import { useState } from "react";
const ProductList = () => {
  const [search, setSearch] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const category = search.get("category");
  const searchQuery = search.get("search");

  // console.log(category);
  // console.log(page);
  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        search: searchQuery,
        category,
        perPage: 10,
        page,
      },
    },
    [searchQuery, category, page]
  );
  useEffect(() => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: 1 });
    setPage(1);
  }, [searchQuery, category]);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isLoading &&
        data &&
        page < data.totalPages
      ) {
        console.log("bot re");
        setPage((prev) => prev + 1);
        // handlePageChange();
      }
      // console.log("sct", scrollTop);
      // console.log("cliht", clientHeight);
      // console.log("scht", scrollHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [search]);
  // const products = data?.products || [];
  // const handlePageChange = (page) => {
  //   const currentParams = Object.fromEntries([...search]);
  //   setSearch({ ...currentParams, page: page });
  // };
  //paginatin code above
  const handlePageChange = () => {
    const currentParams = Object.fromEntries([...search]);
    const currentPage = parseInt(currentParams.page) || 1;
    setSearch({ ...currentParams, page: currentPage + 1 });
  };
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products];
      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]);
  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Ratings HIGH to LOW</option>
          <option value="rate asc">Ratings LOW to HIGH</option>
        </select>
      </header>
      <div className="products_list">
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {!isLoading && error ? (
          <em className="form_error">{error}</em>
        ) : Array.isArray(data?.products) ? (
          sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>Loading or no products found.</p>
        )}
      </div>
      {/* {data && (
        <Pagination
          totalPosts={data?.totalProducts}
          postsPerPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )} */}
    </section>
  );
};

export default ProductList;
