import logo from "../../Assests/newlogo.png";
import search from "../../Assests/search.png";
import cart from "../../Assests/market.png";
import member from "../../Assests/member.png";
import collection from "../../Assests/heart.png"

import Logo from './Logo';
import Category from "./Category";
import RightSide from "./RightSide";
import { StyledHeader } from "./headerStyle";

//////////////////////////////////////////////////////////////////////////////////////
const Header = () => {
  return (
    <StyledHeader>
      <Logo logo={logo} />
      <Category />
      <RightSide search={search} cart={cart} member={member} collection={collection} />
    </StyledHeader>
  );
};

export default Header;
