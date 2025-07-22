import React, { useCallback, useReducer } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Components/Routing/Routing";
import { useState } from "react";
import { useEffect } from "react";
import UserContext from "./context/UserContext";
// import { jwtDecode } from "jwt-decode";
import { getJwt, getUser } from "./Services/UserServices";
import setAuthToken from "./utils/setAuthToken";
import {
  // addToCartAPI,
  decreaseProductAPI,
  // getCartAPI,
  increaseProductAPI,
  // removeFromCarAPI,
} from "./Services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartContext from "./context/cartContext";
import cartReducer from "./reducers/cartReducer";
import useData from "./Hooks/useData";
import useAddToCart from "./Hooks/cart/useAddToCart";
import useRemoveFromCart from "./Hooks/cart/useRemoveFromCart";
const App = () => {
  const [user, setUser] = useState(null);
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  const { data: cartData, refetch } = useData("/cart", null, ["cart"]);

  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();

  // const [cart, setCart] = useState([]);
  useEffect(() => {
    if (cartData) {
      dispatchCart({ type: "GET_CART", payload: { products: cartData } });
    }
  }, [cartData]);
  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);
  useEffect(() => {
    try {
      const token = getJwt();
      setAuthToken(token);

      // const jwt = localStorage.getItem("token");
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  const addToCart = useCallback(
    (product, quantity) => {
      dispatchCart({
        type: "ADD_TO_CART",
        payload: { product: product, quantity: quantity },
      });
      addToCartMutation.mutate(
        { id: product._id, quantity },
        {
          onError: () => {
            toast.error("Login to add a Product to Cart");

            dispatchCart({ type: "REVERT_CART", payload: { cart } });
          },
        }
      );

      // addToCartAPI(product._id, quantity)
      //   .then((res) => {
      //     toast.success("Product Added Successfully");
      //   })
      //   .catch((err) => {
      //     toast.error("Login to add a Product to Cart");
      //     console.log(err.response);
      //     dispatchCart({ type: "REVERT_CART", payload: { cart } });
      //   });
    },
    [cart]
  );
  const removeFromCart = useCallback(
    (id) => {
      dispatchCart({ type: "REMOVE_FROM_CART", payload: { id } });
      removeFromCartMutation.mutate(
        { id: id },
        {
          onError: () => {
            toast.error("Something went wrong");

            dispatchCart({ type: "REVERT_CART", payload: { cart } });
          },
        }
      );
      // removeFromCarAPI(id).catch((err) => {
      //   toast.error("Something went wrong");
      //   dispatchCart({ type: "REVERT_CART", payload: { cart } });
      // });
    },
    [cart]
  );

  const updateCart = useCallback(
    (type, id) => {
      const updateCart = [...cart];
      const productIndex = updateCart.findIndex(
        (item) => item.product._id === id
      );
      if (type === "increase") {
        updateCart[productIndex].quantity += 1;
        dispatchCart({ type: "GET_CART", payload: { products: updateCart } });

        increaseProductAPI(id).catch((err) => {
          toast.error("Something went wrong!");
          dispatchCart({ type: "REVERT_CART", payload: { cart } });
        });
      }
      if (type === "decrease") {
        updateCart[productIndex].quantity -= 1;
        dispatchCart({ type: "GET_CART", payload: { products: updateCart } });
        decreaseProductAPI(id).catch((err) => {
          toast.error("Something went wrong!");
          dispatchCart({ type: "REVERT_CART", payload: { cart } });
        });
      }
    },
    [cart]
  );
  // const getCart = useCallback(() => {
  //   getCartAPI()
  //     .then((res) => {
  //       dispatchCart({ type: "GET_CART", payload: { products: res.data } });
  //     })
  //     .catch((err) => {
  //       toast.error("Something went Wrong!");
  //     });
  // }, [user]);
  // useEffect(() => {
  //   if (user) {
  //     getCart();
  //   }
  // }, [user]);
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
