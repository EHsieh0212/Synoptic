import { StyleBiggerComponent, StyledBigComponent, StyledLeft, StyledImage, StyledDetails, StyledRight } from "./itemStyle";
import Liner from "../../../../Components/Liner";
import { getColorNameByCode } from '../../../../Utils/product';

const CartInfoItem = ({ id, imgSrc, title, price, size, color, quantity, stockMaxQuantity }) => {
    return (
        <StyleBiggerComponent>
            <StyledBigComponent>
                <StyledLeft>
                    <StyledImage>
                        <img src={imgSrc} alt={imgSrc} />
                    </StyledImage>
                    <StyledDetails>
                        <div className="title">{title}</div>
                        <div>${price} TWD</div>
                        <br />
                        <div>Size &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{size}</div>
                        <div >Color &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="color">{getColorNameByCode(color)}</span></div>
                        <div>Quantity &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp; </div>
                    </StyledDetails>
                </StyledLeft>

                <StyledRight>
                    <div>${price * quantity} TWD</div>
                </StyledRight>
            </StyledBigComponent>

            <Liner />
        </StyleBiggerComponent>
    );
};

export default CartInfoItem;
