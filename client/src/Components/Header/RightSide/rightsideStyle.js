import styled from 'styled-components';

export const StyledRightSide = styled.div`
    display: flex;
    justify-content: end;
    margin: 0;
    padding-right: 15px;
`;

export const Search = styled.button`
    padding-top: 0.5px;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 15px;
    margin:0;
    border: none;
    background: none;
    box-shadow: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        margin: 0;
        padding-top: 0.5px;
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0px;
    }
    :hover{
        color:gray;
    }
    font-size: 13.5px;

`;


export const Member = styled.a`
    text-decoration: none;
    padding-top: 0.5px;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13.5px;
    color: inherit;
    :hover{
        color:gray;
    }
`;

export const Cart = styled.a`
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    .cartLength{
        font-size: 12px;
        text-decoration: none;
        color: black;
        :hover{
            color:gray;
        }
    }
`;

export const Collection = styled.a`
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;
