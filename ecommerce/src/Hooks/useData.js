// import React, { useState, useEffect } from "react";
import apiClient from "../utils/api-client";
import { useQuery } from "@tanstack/react-query";
const useData = (
  endpoint,
  customConfig = {},
  queryKey,
  staleTime = 300_000
) => {
  // const [data, setData] = useState(null);
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);

  //   apiClient
  //     .get(endpoint, customConfig)
  //     .then((res) => {
  //       // ✅ Return data directly if not products endpoint
  //       if (endpoint !== "/products") {
  //         setData(res.data);
  //         setIsLoading(false);
  //         return;
  //       }

  //       setData((prev) => {
  //         const currentPage = customConfig?.params?.page;
  //         const currentCategory = customConfig?.params?.category;

  //         const isSameCategory = prev?.category === currentCategory;
  //         const isSameEndpoint = endpoint === "/products";

  //         if (
  //           isSameEndpoint &&
  //           isSameCategory &&
  //           currentPage > 1 &&
  //           Array.isArray(prev?.products) &&
  //           Array.isArray(res.data?.products)
  //         ) {
  //           const existingIds = new Set(prev.products.map((p) => p._id));
  //           const newProducts = res.data.products.filter(
  //             (p) => !existingIds.has(p._id)
  //           );
  //           return {
  //             ...res.data,
  //             products: [...prev.products, ...newProducts],
  //             category: currentCategory,
  //           };
  //         } else {
  //           return { ...res.data, category: currentCategory };
  //         }
  //       });

  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setIsLoading(false);
  //     });
  // }, deps || []);

  // return { data, error, isLoading };
  const fetchFunction = () =>
    apiClient.get(endpoint, customConfig).then((res) => res.data);
  return useQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    staleTime: staleTime,
  });
};

export default useData;
