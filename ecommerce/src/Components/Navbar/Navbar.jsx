import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import Rocket from "../../assets/rocket.png";
import Star from "../../assets/glowing-star.png";
import IDBtn from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";
import LinkWithIcon from "./LinkWithIcon";

const Navbar = () => {
  return (
    <nav className="navbar align_center">
      <div className="align_center">
        <h1 className="navbar_heading">CartWish</h1>
        <form className="align_center navbar_form">
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
          />
          <button type="submit" className="search_button">
            Search
          </button>
        </form>
      </div>
      <div className="navbar_links align_center">
        <LinkWithIcon title="Home" link="/" emoji={Rocket} />
        <LinkWithIcon title="Products" link="/products" emoji={Star} />
        <LinkWithIcon title="Login" link="/login" emoji={IDBtn} />
        <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />
        <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
        <LinkWithIcon title="Logout" link="/logout" emoji={lock} />
        <NavLink to="/cart" className="align_center">
          {" "}
          Cart <p className="align_center cart_counts">0</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
