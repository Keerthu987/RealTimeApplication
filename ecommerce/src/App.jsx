import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Components/Routing/Routing";
import { useState } from "react";
import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
import { getJwt, getUser } from "./Services/UserServices";
import setAuthToken from "./utils/setAuthToken";
import { addToCartAPI } from "./Services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
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

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }

    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product Added Successfully");
      })
      .catch((err) => {
        toast.error("Failed to add Product");
        console.log(err.response);
        setCart(cart);
      });
  };
  return (
    <div className="app">
      <Navbar user={user} cartCount={cart.length} />
      <main>
        <ToastContainer position="bottom-right" />
        <Routing addToCart={addToCart} />
      </main>
    </div>
  );
};

export default App;
