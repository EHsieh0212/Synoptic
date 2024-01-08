import { useState } from "react";
import { Liner } from "../checkoutStyle";
import { getColorNameByCode } from '../../../Utils/product';
import {
    StyledBiggerContainer, StyledBigContainer, StyledLeftContainer, StyledImage,
    StyledDetails, StyledRight
} from './cartitemStyle';

const CartItem = ({ imgSrc, title, price, size, color, quantity }) => {
    const [itemQ, setItemQ] = useState(quantity);

    const decrease = () => {

    };

    const increase = () => {

    };


    return (
        <StyledBiggerContainer>
            <StyledBigContainer>
                <StyledLeftContainer>
                    <StyledImage>
                        <img src={imgSrc} alt={imgSrc} />
                    </StyledImage>
                    <StyledDetails>
                        <div className="title">{title}</div>
                        <div>${price} TWD</div>
                        <br />
                        <div>Size &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{size}</div>
                        <div >Color &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="color">{getColorNameByCode(color)}</span></div>
                        <div>Quantity &nbsp;&nbsp;&nbsp; <span className="minus">-</span> &nbsp;&nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp; <span className="plus">+</span></div>
                    </StyledDetails>
                </StyledLeftContainer>

                <StyledRight>
                    <div className="removeItem">X</div>
                    <div>${price * quantity} TWD</div>
                </StyledRight>
            </StyledBigContainer>
            <Liner />
        </StyledBiggerContainer>
    )
};

export default CartItem;
