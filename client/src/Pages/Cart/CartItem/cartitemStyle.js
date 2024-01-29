import styled from "styled-components";

export const StyledBiggerContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-top: 10px;
`;

export const StyledBigContainer = styled.div`
    display: flex;
    padding-bottom: 10px;
    margin: 0;
`;

export const StyledLeftContainer = styled.div`
    display: flex;
    padding: 0;
    margin-left: 0;
`;

export const StyledImage = styled.a`
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
    font-size: 12.8px;
    .title{
        font-size: 13px;
        text-transform: uppercase;
    }
    .color{
        text-transform: uppercase;
    }
    .minus, .plus{
        background-color: transparent;
        border: none;
        font-size: 13px;
    }
    .minus{
        :hover{
            cursor: ${props => (props.isMin ? 'default' : 'pointer')};
            color: ${props => (props.isMin ? 'default' : 'lightgrey')};
        }
    }
    .plus{
        :hover{
            cursor: ${props => (props.isMax ? 'default' : 'pointer')};
            color: ${props => (props.isMax ? 'default' : 'lightgrey')};
        }
    }
`;

export const StyledRight = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column; 
    font-size: 13px;
    justify-content: space-between;
    width: 25%;
    text-align: right;
    .removeItem{
        background-color: transparent;
        border: none;
        padding: 0;
        margin: 0;
        text-align: right;
        :hover{
            color: lightgrey;
        }
    }
`;
