import styled from "styled-components";

export const StyledProductContainer = styled.div`
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 10px;
    width: 100%;
    margin: 0 auto;
    max-width: 1700px;
    /* align-items: center; */
    /* @media (max-width: 1300px) { /* 在螢幕寬度小於768px時，改變容器大小 */
        /* width: 80%; */
     /* */
`;
export const StyledMore = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
`;
export const More = styled.button`
    border: 1px solid #B8B8B8;
    padding-left: 15px;
    padding-right: 15px;
    :hover{
        background-color: ${props => props.canMore < 6 ? 'none' : 'gray'};
        cursor: ${props => props.canMore < 6 ? 'default' : 'pointer'};;
    }
    font-weight: 500;
`;

export const StyledProduct = styled.div`
    display: flex;
    flex-direction: column;
    width: 470px;
    /* @media (max-width: 768px) { 
        width: 50%;
    } */
    padding: 0px;
`;

export const StyledImage = styled.a`
  display: block; /** */
  text-align: center; /** */
  padding:0;
  margin: 0;
`;

export const Image = styled.img`
  width: 100%;
  height: 680px; 
`;

export const StyledTitle = styled.a`
  padding:0;
  margin: 0;
  color: black;
  text-decoration: none; /* Link will eventually renders into a, so this assignment is working. */
    :hover{
      cursor: pointer;
      color: grey;
    }
    font-size: 15px;
`;
export const StyledPrice = styled.div`
  padding:0;
  margin: 0;
  font-size: 12px;
`;
export const StyledColorContainer = styled.div`
    display: flex;
`;
export const ColorBlock = styled.div`
    background-color: ${props => props.color};
    padding: 0; 
    height: 10px; 
    width: 10px; 
    border: 1px solid #000;
    /* gap: 12px; */
`;