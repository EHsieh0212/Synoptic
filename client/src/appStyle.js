import styled from 'styled-components';

export const SearchBox = styled.nav`
  padding: 10px;
  margin-top: 10px;
  position: absolute;
  top: 100%;
  z-index: 9999;
  display: ${({ showSearch }) => (showSearch ? 'block' : 'none')};
`;

