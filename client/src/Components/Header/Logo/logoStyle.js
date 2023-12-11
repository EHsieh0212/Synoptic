import styled from 'styled-components';

export const StyledLogo = styled.a`
  display: block;
  @media (min-width: 576px) {
    & {
      padding-top: 0;
    }
  }
  @media (min-width: 768px) {
    & {
      padding-top: 1rem;
    }
  }
  @media (min-width: 1200px) {
    & {
      padding-top: 0;
    }
  }
`;

export const LogoImage = styled.img`
  @media (min-width: 576px) {
    & {
      width: 10%;
    }
  }
  @media (min-width: 768px) {
    & {
      width: 50%;
    }
  }
  @media (min-width: 1200px) {
    & {
      width: 30%;
    }
  }
`;
