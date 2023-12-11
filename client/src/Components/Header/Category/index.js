import { Link } from "react-router-dom";
import { StyledCategory, NavItem } from './categoryStyle';

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
                The Gift Guide
            </NavItem>
            <NavItem onClick={() => handleNavigation('/?category=accessories')}>
                Magazine
            </NavItem>
        </StyledCategory>
    );
};

export default Category;
