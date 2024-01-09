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

export const OrderInfoContainer = styled.div`
    /* display: flex; */
    margin-left: 3px;
    margin-right: 3px;
`;

export const OrderInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 14px;
    .delivery{
        text-transform: uppercase;
    }
`;

export const Liner = styled.div` 
  background-color: black;
  border-top: 1.5px solid #BEBEBE;
  padding: 0;
  max-width: 100%;
`;

export const ProceedToCheckout = styled.button`
  text-transform: uppercase;
  margin-top: 10px;
  box-sizing: border-box; /*  box includes not only content, but also border/padding */
  /* height: 45px;
  width: 550px; same as select menu bar's width */
  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 12px;
  font-weight: 450;
  background-color: black;
  border: none;
  color:white;
  :hover{
    background-color: gray; 
  }
  a{
    color: white;
    text-decoration: none; /* Link will eventually renders into a, so this assignment is working. */
  }
`;

