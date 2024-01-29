import styled from "styled-components";
import check from '../../Assests/check.png'


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 200px;
`;


const StyledThanks = styled.div`
    font-size: 80px;
`;

const StyledComment = styled.div`
    padding-top: 50px;
    font-size: 17px;
`;

const Thanks = () => {

    return (
        <StyledContainer>
            <StyledThanks>Thank You!</StyledThanks>
            <img src={check} alt="check" />
            <StyledComment> Your Order Is Completed Successfully. Thank You For Shopping At Synoptic. </StyledComment>
        </StyledContainer>
    )
};

export default Thanks;