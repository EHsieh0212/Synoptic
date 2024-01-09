import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Main = styled.div`
    margin-left: 300px;
    margin-right: 300px;
    padding-top: 150px;
    padding-bottom: 300px;
    text-align: center;

`;

const Text = styled.div`
    padding-bottom: 20px;
    font-size: 15px;
`;

const ContinueShopping = styled.button`
  text-transform: uppercase;
  margin-top: 10px;
  box-sizing: border-box; /*  box includes not only content, but also border/padding */
  /* height: 45px;
  width: 550px; same as select menu bar's width */
  width: 30%;
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
    text-align: center;
    color: white;
    text-decoration: none; /* Link will eventually renders into a, so this assignment is working. */
  }
  
`;

const YourCartIsEmpty = () => {
    const navigate = useNavigate();
    const handleNavigationToWomen = () => {
      navigate(`/category/women`);
    };

    return (
        <Main>
            <Text>Your shopping bad is empty</Text>
            <ContinueShopping onClick={handleNavigationToWomen}> continue shopping </ContinueShopping>
        </Main>
    );
};

export default YourCartIsEmpty;
