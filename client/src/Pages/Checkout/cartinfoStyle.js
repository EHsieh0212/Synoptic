import styled from "styled-components";

export const CartInfoContainer = styled.div`
    font-size: 18px;
    width: 35%;
    margin: 0;
    padding: 0;
`

export const TitlePart = styled.div`
    display: flex;
    text-transform: uppercase;
    justify-content: space-between;
    .title{
        font-size: 15px;
    }
    .edit{
        font-size: 12px;
        align-self: flex-end;
        :hover{
            cursor: pointer;
            color: gray;
            text-decoration: underline;
        }
    }
`;

export const StyledItemContainer = styled.div`
`;

export const StyledBottom = styled.div`
    padding-top: 45px;
    padding-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
`;

export const StyledOrderValue = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 13.5px;
    text-transform: uppercase;
    padding-bottom: 8px;
    .total{
        margin-left: 10px;
        margin-right: 10px;
        padding-bottom: 20px;
    }
`;

export const ShoppingInfos = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    font-size: 12px;
    font-weight: 600;
    padding-bottom: 5px;

`;