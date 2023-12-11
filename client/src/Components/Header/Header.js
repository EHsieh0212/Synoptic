import { Link } from "react-router-dom";

import logo from "../../Assests/newlogo.png";
import search from "../../Assests/search.png";
import cart from "../../Assests/cart.png";
import member from "../../Assests/member.png";
import heart from "../../Assests/heart.png"

import Logo from './Logo';
import Category from "./Category";
import "./Header.css";

//////////////////////////////////////////////////////////////////////////////////////
const Header = () => {
  return (
    <nav className="py-0 py-xl-4 navbar">
      <div className="px-0 px-xl-3 container-fluid">
        <Logo logo={logo} />
        <Category />
        <div className="input-group-append">
          <button className="btn shadow-none" type="submit">
            <img src={search} alt="search" /> Search
          </button>
        </div>
        <div className="nav-item px-xl-3">
          <a className="nav-link" href="/">
            <img src={cart} alt="cart" />
          </a>
        </div>
        <div className="nav-item px-xl-3">
          <a className="nav-link" href="/">
            <img src={member} alt="member" />
          </a>
        </div>
        <div className="nav-item px-xl-3">
          <a className="nav-link" href="/">
            <img src={heart} alt="heart" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
