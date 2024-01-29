import styled from 'styled-components';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StyledSearchbox = styled.div`
    border: none;
    opacity: ${props => (props.isActive ? '1' : '0')};
    visibility: ${props => (props.isActive ? 'visible' : 'hidden')};
    /* display: ${props => (props.isActive ? 'block' : 'none')}; this is not working if we want to add fade-in effect */
    z-index: 1000;
    position: fixed;
    width: 100%; /* parent div should set width=100% too, so child can have the same width setting.*/
    transition: opacity 0.2s ease-in-out; /* unsolved: no fade-out */
    .input{
        width: 100%;
        border: none;
        outline: none;
        height: 50px;
        padding-left: 40px;
        font-size: 21px;
    }
`;

/* noted */
const MaskOverlay = styled.div`
  position: fixed; /* noted */
  z-index: 1000; /* noted */
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: ${props => (props.isActive ? 'block' : 'none')};
`;

const SearchBox = ({ isActive }) => {
    const [keyword, setKeyword] = useState("");
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const handleNavigation = (keyword) => {
      navigate(`/search/${keyword}`);
      window.location.reload(); 
    };

    useEffect(() => {
        if (isActive && inputRef.current) {
          inputRef.current.focus();
          inputRef.current.value = '';
        }
      }, [isActive]);

    return(
        <StyledSearchbox isActive={isActive}>
            <input 
              className='input' 
              type="text" 
              placeholder="Search..." 
              ref={inputRef}
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleNavigation(keyword);
                  }
                }}
              />
            <MaskOverlay isActive={isActive}/>
        </StyledSearchbox>
    )
};

export default SearchBox;
