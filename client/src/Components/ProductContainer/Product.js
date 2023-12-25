//////////////////////////////////////////////////////////////////////
// upstream: prop
// pass-in: img, name, price, [color]
const Product = ({ img, name, price, colors }) => {
  return (
    <div className="product col-6 col-xl-4">
      <a className="nav-link" href="/">
        <img className="product-img" src={img} alt="product-img" />
        <div className="color">
          {colors?.map((e, idx) => (<button key={idx} className="product-color-btn" style={{ background: e }} ></button>))}
        </div>
        <div className="product-detail">
          <div className="product-name">{name}</div>
          <div className="product-price">TWD.{price}</div>
        </div>
      </a>
    </div>
  );
};


export default Product;