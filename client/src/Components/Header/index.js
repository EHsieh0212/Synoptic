import logo from "../../Assests/newlogo.png";
import search from "../../Assests/search.png";
import cart from "../../Assests/market.png";
import member from "../../Assests/member.png";
import collection from "../../Assests/heart.png"

import Logo from './Logo';
import Category from "./Category";
import RightSide from "./RightSide";

import { useState, useEffect } from "react";
import styled from 'styled-components';

const FixedHeader = styled.div`
  position: sticky; /* to stick header on top */
  top: 0;           /* to stick header on top */
  background-color: #ffffff;  /* to stick header on top */
  z-index: 9999; /* but prevent overlaying(bc searchbox=1000) */
`;

const StyledHeader = styled.div`
  padding: 1rem;
  padding-bottom: 0;
  display: grid;
  grid-template-columns: 0.6fr 2fr 1fr;
`;

const Liner = styled.div` 
  background-color: #fff;
  border-top: 0.5px solid #BEBEBE;
  margin: 0;
  padding: 0;
  display: ${props => (props.showSearch? 'block' : 'none')};
`;


const Header = ({ showSearch, handleSearchBox }) => {
  const [cartNum, setCartNum] = useState(0);

  const getCartNum = () => {
      const cartLength = localStorage.getItem("cartLength");
      setCartNum(cartLength);
  };
  // 1. init cart number
  useEffect(() => {
    const cartLength = localStorage.getItem("cartLength");
    setCartNum(cartLength);
  }, []);
  
  // 2. monitor on cart number changes
  useEffect(() => {
    window.addEventListener('storage', getCartNum)
    return () => {
      window.removeEventListener('storage', getCartNum);
    };
  }, []);

  return (
    <FixedHeader>
    <StyledHeader>
      <Logo logo={logo} />
      <Category />
      <RightSide search={search} cart={cart} member={member} collection={collection} handleSearchBox={handleSearchBox} cartNum={cartNum}/>
    </StyledHeader>
    <Liner showSearch={showSearch}/>
    </FixedHeader>
  );
};

export default Header;
