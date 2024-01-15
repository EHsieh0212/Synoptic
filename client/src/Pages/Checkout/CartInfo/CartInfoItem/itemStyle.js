import styled from "styled-components";

export const StyleBiggerComponent = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-top: 10px;
    margin-left: 12px;
    margin-right: 12px;
`;

export const StyledBigComponent = styled.div`
    display: flex;
    padding-bottom: 8px;
    margin: 0;
`;

export const StyledLeft = styled.div`
    display: flex;
`;

export const StyledImage = styled.div`
    display: block; 
    text-align: left;
    width: 15%;
    padding: 0;
    margin: 0;
    img {
        width: 100%; 
        height: auto; /* noted: this makes pic maintains porpotion */
        object-fit: contain;
    }
`;

export const StyledDetails = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 60%;
    padding-left: 30px;
    font-size: 11px;
    .title{
        font-size: 12px;
        text-transform: uppercase;
    }
    .color{
        text-transform: uppercase;
    }
`;

export const StyledRight = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column; 
    font-size: 11.5px;
    align-self: flex-end;
    width: 25%;
    text-align: right;
`;

