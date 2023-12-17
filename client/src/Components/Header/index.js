import logo from "../../Assests/newlogo.png";
import search from "../../Assests/search.png";
import cart from "../../Assests/market.png";
import member from "../../Assests/member.png";
import collection from "../../Assests/heart.png"

import Logo from './Logo';
import Category from "./Category";
import RightSide from "./RightSide";

import styled from 'styled-components';

const StyledHeader = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 0.6fr 2fr 1fr;
`;

const Header = ({ handleSearchBox }) => {
  return (
    <StyledHeader>
      <Logo logo={logo} />
      <Category />
      <RightSide search={search} cart={cart} member={member} collection={collection} handleSearchBox={handleSearchBox}/>
    </StyledHeader>
  );
};

export default Header;
