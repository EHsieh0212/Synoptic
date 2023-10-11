// import images
import line from "../../Assests/line.png";
import twitter from "../../Assests/twitter.png";
import fb from "../../Assests/facebook.png";
import cart from "../../Assests/cart-mobile.png";
import member from "../../Assests/member-mobile.png";

// import css
import "./Footer.css";

///////////////////////////////////////////////////////////////////
// main footer
// navbar
const Footer = () => {
  return (
    <footer>
      <div className="container-fluid">
        <div className="row align-items-center bg-dark py-3">
          <div className="col-6 col-xl-7">
            <Infos />
          </div>
          <div className="col-6 col-xl-2">
            <Social />
          </div>
          <div className="col-6 col-xl-3 mx-0 justify-content-center justify-content-xl-end">
            <Copyright />
          </div>
        </div>
      </div>
      <CartAndMember />
    </footer>
  );
};

///////////////////////////////////////////////////////////////////
// independent footer components
const Infos = () => {
  return (
    <div className="row align-items-center justify-content-center">
      <div className="col-4 col-xl-1 p-0 mx-auto">
        <a className="nav-link text-light" href="/">
          關於 STYLiSH
        </a>
      </div>
      <div className="col-xl-1 text-light d-none d-xl-block p-0">|</div>
      <div className="col-5 col-xl-1 p-0 mx-auto">
        <a className="nav-link text-light p-0" href="/">
          服務條款
        </a>
      </div>
      <div className="col-xl-1 text-light d-none d-xl-block p-0">|</div>
      <div className="col-5 col-xl-1 p-0 mx-auto">
        <a className="nav-link text-light" href="#about">
          隱私政策
        </a>
      </div>
      <div className="col-xl-1 text-light d-none d-xl-block p-0">|</div>
      <div className="col-5 col-xl-1 p-0 mx-auto">
        <a className="nav-link text-light" href="#about">
          聯絡我們
        </a>
      </div>
      <div className="col-xl-1 text-light d-none d-xl-block p-0">|</div>
      <div className="col-5 col-xl-1 p-0 mx-auto">
        <a className="nav-link text-light" href="#about">
          FAQ
        </a>
      </div>
    </div>
  );
};

const Social = () => {
  return (
    <div className="row align-items-center justify-content-center mx-auto">
      <div className="col-4 col-xl-1 gx-5 px-4">
        <a href="/">
          <img src={fb} alt="fb" />
        </a>
      </div>
      <div className="col-4 col-xl-1 gx-5 px-4">
        <a href="/">
          <img src={line} alt="line" />
        </a>
      </div>
      <div className="col-4 col-xl-1 gx-5 px-4">
        <a href="/">
          <img src={twitter} alt="twitter" />
        </a>
      </div>
    </div>
  );
};

const Copyright = () => {
  return (
    <div className="col copyright text-muted">
      &copy;2018. All rights reserved.
    </div>
  );
};

const CartAndMember = () => {
  return (
    <nav className="navbar navbar-expand bg-dark d-flex d-xl-none under-footer fixed-bottom">
      <ul className="navbar-nav w-100 align-items-center justify-content-xl-between ">
        <li className="nav-item ms-xl-5 me-xl-2 col text-center">
          <a className="nav-link text-light" href="/">
            <img src={cart} alt="cart-mobile" />
            購物車
          </a>
        </li>
        <li className="nav-item mx-xl-2">｜</li>
        <li className="nav-item mx-xl-2 col text-center">
          <a className="nav-link text-light" href="/">
            <img src={member} alt="member-mobile" />
            會員
          </a>
        </li>
        <li className="nav-item mx-xl-2">｜</li>
      </ul>
    </nav>
  );
};

export default Footer;
