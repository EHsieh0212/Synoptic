import { Link } from "react-router-dom";

// import pictures
import logo from "../../Assests/newlogo.png";
import search from "../../Assests/search.png";
import cart from "../../Assests/cart.png";
import member from "../../Assests/member.png";

// import css
import "./Header.css";

//////////////////////////////////////////////////////////////////////////////////////
// main navbar(header)
const Header = () => {
  return (
    <header className="nav-link">
      <nav className="navbar navbar-light navbar-expand-xl align-items-center p-0 main-navbar">
        <Logo />
        <Category />
        <CategoryMobile />
        <div className="collapse navbar-collapse align-items-center justify-content-xl-end">
          <div className="navbar-nav align-items-center">
            <SearchBox search={search} />
          </div>
        </div>
        <CartAndMember cart={cart} member={member} />
      </nav>
      <Divider />
    </header>
  );
};

//////////////////////////////////////////////////////////////////////////////////////
// independent navbar components: logo, categories, categories-mobile, search-box, cart&member, divider
// Router links:
// Logo: to Home component
// Categories: to Home component
// ?categories=param
// Search: to Home component
const Logo = () => {
  return (
    <div className="p-0 align-item-center mx-auto">
      <Link to="/" className="navbar-brand mx-xl- logo">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <button
        className="navbar-toggler border-0 shadow-none search-btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#search-toggler"
        aria-controls="search-toggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <img src={search} alt="search" />
      </button>
    </div>
  );
};

const Category = () => {
  return (
    <nav className="navbar navbar-expand nav-category d-none d-xl-flex">
      <ul className="navbar-nav align-items-center justify-content-xl-center">
        <li className="nav-item me-2 col text-center acategory ">
          <Link to="/?categories=women" className="nav-link category">
            {" "}
            女裝{" "}
          </Link>
        </li>
        <li className="nav-item me-2 category ">｜</li>
        <li className="nav-item me-2 col text-center acategory">
          <Link to="/?categories=men" className="nav-link category">
            {" "}
            男裝{" "}
          </Link>
        </li>
        <li className="nav-item me-2 category ">｜</li>
        <li className="nav-item me-2 col text-center acategory">
          <Link to="/?categories=accessories" className="nav-link category">
            {" "}
            配件{" "}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const CategoryMobile = () => {
  return (
    <nav className="navbar navbar-expand bg-dark p-0 w-100 h-100 d-flex d-xl-none">
      <ul className="navbar-nav align-items-center justify-content-xl-between w-100">
        <li className="nav-item ms-xl-5 me-xl-2 col text-center acategory ">
          <Link to="/?categories=women" className="nav-link category text-light">
            {" "}
            女裝{" "}
          </Link>
        </li>
        <li className="nav-item mx-xl-2">｜</li>
        <li className="nav-item mx-xl-2 col text-center acategory">
          <Link to="/?categories=men" className="nav-link category text-light">
            {" "}
            男裝{" "}
          </Link>
        </li>
        <li className="nav-item mx-xl-2">｜</li>
        <li className="nav-item ms-xl-2 col text-center acategory">
          <Link to="/?categories=accessories" className="nav-link category text-light">
            {" "}
            配件{" "}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const SearchBox = () => {
  return (
      <form className="form-inline search-form">
        <div className="input-group border border-dark rounded-pill">
          <input
            type="search"
            name="search"
            className="form-control border-0 ms-3 px-xl-3 shadow-none rounded-pill"
            placeholder="西裝"
            aria-describedby="basic-addon"
          />
          <div className="input-group-append">
            <button className="btn shadow-none" type="submit">
              <img src={search} alt="search" />
            </button>
          </div>
        </div>
      </form>
  );
};

const CartAndMember = () => {
  return (
    <div className="navbar navbar-expand nav-tabs d-none d-xl-flex">
      <ul className="navbar-nav d-flex justify-content-center mx-3">
        <li className="nav-item px-xl-3">
          <a className="nav-link" href="/">
            <img src={cart} alt="cart" />
          </a>
        </li>
        <li className="nav-item px-xl-3">
          <a className="nav-link" href="/">
            <img src={member} alt="member" />
          </a>
        </li>
      </ul>
    </div>
  );
};

const Divider = () => {
  return (
    <div className="nav-item text bg-dark d-none d-xl-flex"> divider </div>
  );
};

///////////////////////////////////////////////////////////////////////////////
export default Header;
