import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import SearchBox from '../../Components/SearchBox';
import styled from "styled-components";
import React, { useState, createContext } from 'react';
export const AppContext = createContext();


const StyledMain = styled.div`

`;


const MainLayout = () => {
    const [showSearch, setShowSearch] = useState(false);
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };
    return (
        <AppContext.Provider value={{ showSearch, toggleSearch }}>
            <StyledMain>
                <Header handleSearchBox={toggleSearch} isActive={showSearch} />
                <SearchBox isActive={showSearch} />
                <Outlet isActive={showSearch} />
                {/* <Footer/> */}
            </StyledMain>
        </AppContext.Provider>

    )
};

export default MainLayout;
