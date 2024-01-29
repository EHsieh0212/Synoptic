import Liner from "../../../Components/Liner";
import { CartInfoContainer, TitlePart, StyledItemContainer, StyledOrderValue, StyledBottom, ShoppingInfos } from "../cartinfoStyle";
import { useNavigate } from 'react-router-dom';
import CartInfoItem from './CartInfoItem';


const CartInfo = ({ cartItems, totalPrice }) => {
    const navigate = useNavigate();
    const proceedToCart = () => {
        navigate('/cart');
    };

    return (
        <CartInfoContainer>
            <TitlePart>
                <div className="title">Cart Info</div>
                <div className="edit" onClick={proceedToCart}>edit</div>
            </TitlePart>
            <Liner />
            <StyledItemContainer>
                {cartItems.map(item => (
                    <div>
                        <CartInfoItem
                            id={item.productId}
                            key={`${item.title}_${item.productId}_${item.color}_${item.size}`}
                            imgSrc={item.imgSrc}
                            title={item.title}
                            price={item.price}
                            size={item.size}
                            color={item.color}
                            quantity={item.incrementBy}
                            stockMaxQuantity={item.stockMaxQuantity}
                        />
                    </div>
                ))}
            </StyledItemContainer>
            <StyledBottom>
                <StyledOrderValue>
                    <div>order value</div>
                    <div>${totalPrice} TWD</div>
                </StyledOrderValue>
                <StyledOrderValue>
                    <div>delivery</div>
                    <div>free</div>
                </StyledOrderValue>
                <Liner />
            </StyledBottom>
            <StyledOrderValue>
                <div className="total">total</div>
                <div className="total">${totalPrice} TWD</div>
            </StyledOrderValue>
            <ShoppingInfos>
                Free shipping on orders over $1000.
            </ShoppingInfos>
            <ShoppingInfos>
                For the festive season, all online purchases made between 31/10/23 and 21/12/2023 can be returned up to 31/01/24.
            </ShoppingInfos>
            <br/><br/>


        </CartInfoContainer>
    )
};

export default CartInfo;