import styled from "styled-components";

export const BigContainer = styled.div`
    display: flex;
    margin-top: 30px;
    margin-left: 130px;
    margin-right: 100px;
    padding-bottom: 120px;
    max-width: 100%;
    justify-content: space-between;
`;

export const StyledShoppingBag = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 55%;
    .title{
        font-size: 16px;
        text-transform: uppercase;
        padding-bottom: 5px;
    };
    padding-top:0;
    padding-bottom: 0;
`;

export const StyledItemContainer = styled.div`

`;


export const StyledOrderSummary = styled.div`
    width: 35%;
    .title{
        font-size: 16px;
        text-transform: uppercase;
        padding-bottom: 5px;
    };
    padding-top:0;
    padding-bottom: 0;
    margin-right: 50px;
`;

export const Liner = styled.div` 
  background-color: black;
  border-top: 1.5px solid #BEBEBE;
  padding: 0;
  max-width: 100%;
`;


