import styled from "styled-components";
import Liner from "../../../Components/Liner";

const StyledCartInfo = styled.div`
    width: 50%;
    font-size: 18px;
    text-transform: uppercase;
`

const CartInfo = () => {
    return(
        <StyledCartInfo>
            Cart Info
            <Liner/>
        
        </StyledCartInfo>
    )
};

export default CartInfo;