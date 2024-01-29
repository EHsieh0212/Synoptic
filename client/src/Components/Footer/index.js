import styled from "styled-components";
import { Link } from 'react-router-dom';

const Liner = styled.div` 
  background-color: #fff;
  border-top: 0.5px solid #BEBEBE;
  margin-left: 100px; /* margin, not padding, to control liner length */
  margin-right: 100px;
  padding: 0;
`;

const StyledFooter = styled.div`
    display: flex;
    height: 250px;
    padding-top: 50px;
    padding-bottom: 300px;
    padding-left: 60px;
    padding-right: 60px;
    gap: 19px;
`;

const StyledLeft = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width:20%; /* each element's length*/
    font-size: 13.5px;
    gap:5px;
    div{
      flex: 1 1 100%; /*noted: not flex-direction column, instead 100% horizontal possession*/
    }
`;

const LeftItem = styled.div`
  a{
    color: black;
    text-decoration: none; /* Link will eventually renders into a, so this assignment is working. */
    :hover{
      cursor: pointer;
      color: grey;
    }
  }
`;

const StyledRight = styled.div`
  display: flex;
  width: 70%; /* each element's length*/
  justify-content: right;
  gap: 35px;
`;

const RightItem = styled.div`
  font-weight: 300;
  font-size: 23px;
  text-align: right;
`;

const SubscribeBtn = styled.button`
  margin-top:10px;
  box-sizing: border-box; /*  box includes not only content, but also border/padding */
  height: 45px;
  width: 150px;
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


const Footer = () => {
  return (
    <div>
      <Liner />
      <StyledFooter>
        <StyledLeft>
          <LeftItem>
            <Link to="/">Contact Us</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Delivery Information</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Returns & Refunds</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Customer Service</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Size Guide</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">FAQs</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Privacy Notice</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Cookie Notice</Link>
          </LeftItem>
        </StyledLeft>
        <StyledLeft>
          <LeftItem>
            <Link to="/">Store Locator</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Student Discount</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Sustainability</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">About Synoptic</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Careers</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Press</Link>
          </LeftItem>
        </StyledLeft>
        <StyledLeft>
          <LeftItem>
            <Link to="/">Facebook</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Twitter</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Instagram</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Pinterest</Link>
          </LeftItem>
          <LeftItem>
            <Link to="/">Spotify</Link>
          </LeftItem>
        </StyledLeft>
        <StyledRight>
          <RightItem>
            Enjoy 10% off your <br /> first order
          </RightItem>
          <SubscribeBtn>
            <Link to="/">SUBSCRIBE</Link>
          </SubscribeBtn>
        </StyledRight>
      </StyledFooter>
    </div>
  );
};


export default Footer;
