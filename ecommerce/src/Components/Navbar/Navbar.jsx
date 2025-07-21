import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink, useNavigate, Link } from "react-router-dom";
import Rocket from "../../assets/rocket.png";
import Star from "../../assets/glowing-star.png";
import IDBtn from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";
import LinkWithIcon from "./LinkWithIcon";
import UserContext from "../../context/UserContext";
import CartContext from "../../context/cartContext";
import { getSuggestionsAPI } from "../../Services/productServices";

const Navbar = () => {
  const [suggestions, setSuggestions] = useState("");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const { cart, addToCart } = useContext(CartContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() != "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };
  useEffect(() => {
    const delaySuggestion = setTimeout(() => {
      if (search.trim() != "") {
        getSuggestionsAPI(search)
          .then((res) => setSuggestions(res.data))
          .catch((err) => {
            console.log(err);
          });
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delaySuggestion);
  }, [search]);

  const handleKeyDown = (e) => {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((curr) =>
          curr === suggestions.length - 1 ? 0 : curr + 1
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((curr) =>
          curr === 0 ? suggestions.length - 1 : curr - 1
        );
      } else if (e.key === "Enter" && selectedItem > -1) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    } else {
      setSelectedItem(-1);
    }
    // console.log(e.key);
  };
  // console.log(suggestions);
  return (
    <nav className="navbar align_center">
      <div className="align_center">
        <h1 className="navbar_heading">CartWish</h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="navbar_search"
            placeholder="Search Products"
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="search_button">
            Search
          </button>
          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                  key={suggestion._id}
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setSearch(suggestion.title);
                      setSuggestions([]);
                    }}
                  >
                    {" "}
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="navbar_links align_center">
        <LinkWithIcon title="Home" link="/" emoji={Rocket} />
        <LinkWithIcon title="Products" link="/products" emoji={Star} />
        {!user && (
          <>
            {" "}
            <LinkWithIcon title="Login" link="/login" emoji={IDBtn} />
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />
          </>
        )}{" "}
        {user && (
          <>
            <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
            <LinkWithIcon title="Logout" link="/logout" emoji={lock} />
            <NavLink to="/cart" className="align_center">
              {" "}
              Cart <p className="align_center cart_counts">{cart.length}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
