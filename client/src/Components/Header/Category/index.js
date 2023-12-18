import styled from 'styled-components';

const StyledCategory = styled.ul`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.div`
    padding: 10px;
    cursor: pointer;
    padding-right: 30px;
    font-size: 17px;
`;

const Category = () => {
    const handleNavigation = href => {
        window.location.href = href;
    };

    return (
        <StyledCategory>
            <NavItem onClick={() => handleNavigation('/?category=women')}>
                Women
            </NavItem>
            <NavItem onClick={() => handleNavigation('/?category=men')}>
                Men
            </NavItem>
            <NavItem onClick={() => handleNavigation('/?category=accessories')}>
                Magazine
            </NavItem>
        </StyledCategory>
    );
};

export default Category;
