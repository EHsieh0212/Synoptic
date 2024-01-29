import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate();
    const handleNavigation = (category) => {
      navigate(`/category/${category}`);
      window.location.reload(); 
    };

    return (
        <StyledCategory>
            <NavItem onClick={() => handleNavigation('women')}>
                Women
            </NavItem>
            <NavItem onClick={() => handleNavigation('men')}>
                Men
            </NavItem>
            <NavItem onClick={() => handleNavigation('magazine')}>
                Magazine
            </NavItem>
        </StyledCategory>
    );
};

export default Category;
