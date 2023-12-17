import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import SearchBox from '../../Components/SearchBox';
import styled from "styled-components";
import React, { useState } from 'react';


const StyledMain = styled.div`
    padding-left: 5px;
    padding-right: 5px;
`;



const MainLayout = () => {
    const [showSearch, setShowSearch] = useState(false);
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };
    return (
        <StyledMain>
            <Header handleSearchBox={toggleSearch} isActive={showSearch} />
            <SearchBox isActive={showSearch} />
            <Outlet />
            {/* <Footer/> */}
        </StyledMain>
    )
};

export default MainLayout;
