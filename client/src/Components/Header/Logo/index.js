import React from 'react';
import styled from 'styled-components';

const StyledLogo = styled.a`
  padding:0;
  margin: 0;
`;

const LogoImage = styled.img`
  width: 80%;
`;

const Logo = ({ logo }) => {
  return (
    <StyledLogo href="/">
      <LogoImage src={logo} alt="Logo" />
    </StyledLogo>
  );
};

export default Logo;
