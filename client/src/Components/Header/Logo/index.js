import React from 'react';
import { StyledLogo, LogoImage } from './logoStyle';
import { Link } from "react-router-dom";


const Logo = ({ logo }) => {
  return (
    <StyledLogo href="/">
      <LogoImage src={logo} alt="Logo" />
    </StyledLogo>
  );
};

export default Logo;
