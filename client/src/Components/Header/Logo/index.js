import React from 'react';
import { StyledLogo, LogoImage } from './logoStyle';

const Logo = ({ logo }) => {
  return (
    <StyledLogo href="/">
      <LogoImage src={logo} alt="Logo" />
    </StyledLogo>
  );
};

export default Logo;
