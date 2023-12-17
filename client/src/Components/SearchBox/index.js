import styled from 'styled-components';
import React, { useRef, useEffect } from 'react';

const StyledSearchbox = styled.div`
    color: blue;
    border: none;
    display: ${props => (props.isActive ? 'block' : 'none')};
    z-index: 1000;
    position: fixed;
    width: 100%; /* parent div should set width=100% too, so child can have the same width setting.*/
    .input{
        width: 100%;
        border: none;
        outline: none;
        height: 50px;
        padding-left: 40px;
        font-size: 21px;
    }
`;

const MaskOverlay = styled.div`
  position: fixed; /* noted */
  z-index: 1000; /* noted */
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: ${props => (props.isActive ? 'block' : 'none')};
`;

const SearchBox = ({ isActive }) => {
    const inputRef = useRef(null);
    useEffect(() => {
        if (isActive && inputRef.current) {
          inputRef.current.focus();
          inputRef.current.value = '';
        }
      }, [isActive]);

    return(
        <StyledSearchbox isActive={isActive}>
            <input className='input' type="text" placeholder="Search..." ref={inputRef}/>
            <MaskOverlay isActive={isActive}/>
        </StyledSearchbox>
    )
};

export default SearchBox;