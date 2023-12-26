import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import SearchBox from '../../Components/SearchBox';
import styled from "styled-components";
import React, { useState } from 'react';

const StyledMain = styled.div`
    padding-left: 5px;
    padding-right: 5px;
    overflow: ${props => (props.isActive ? 'hidden': 'active')}; /*stop window from scrolling*/
    position: ${props => (props.isActive ? 'fixed' : 'relative')}; /*stop window from scrolling */
`;

const MainLayout = () => {
    const [showSearch, setShowSearch] = useState(false);

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    return (
        <StyledMain isActive={showSearch}>
            <Header handleSearchBox={toggleSearch} isActive={showSearch} />
            <SearchBox isActive={showSearch} />
            <Outlet />
            <Footer/>
        </StyledMain>
    )
};

export default MainLayout;
