import { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import Liner from "../../../Components/Liner";
import { getColorNameByCode } from '../../../Utils/product';
import {
    StyledBiggerContainer, StyledBigContainer, StyledLeftContainer, StyledImage,
    StyledDetails, StyledRight
} from './cartitemStyle';


const CartItem = ({ id, imgSrc, title, price, size, color, quantity, stockMaxQuantity, setUpdatedItem, setDeletedItem }) => {
    const [itemQ, setItemQ] = useState(quantity);
    const [stockQ, setStockQ] = useState(stockMaxQuantity);

    const decrease = () => {
        // cannot lower than 1
        if (itemQ > 1) {
            const newQ = itemQ - 1;
            const newStock = stockQ + 1;
            // (1) update CartItem component quantity& individual total price
            setItemQ(newQ);
            setStockQ(newStock);
            // (2) update Checkout component: pass back item's new whole info
            const updatedItem = {
                title,
                size,
                color,
                incrementBy: newQ,
                stockMaxQuantity: newStock
            };
            setUpdatedItem([updatedItem]);
        };
    };

    const increase = () => {
        // cannot surpass maxQuantity
        if (itemQ < stockMaxQuantity) {
            const newQ = itemQ + 1;
            const newStock = stockQ - 1;
            setItemQ(newQ);
            setStockQ(newStock);
            const updatedItem = {
                title,
                size,
                color,
                incrementBy: newQ,
                stockMaxQuantity: newStock
            };
            setUpdatedItem([updatedItem]);
        } else {
            toast('Cannot add more product.', { id: 'uniqueID', duration: 1500, icon: '💡', }); // given uniqueId to prevent toasts from duplicating.
        };
    };

    const removeAItem = () => {
        // 1. update cart & store back to redis
        // 2. localStorage - 1
        // 3. triggers re-render Checkout component
        const deletedItem = {
            title,
            size,
            color,
        };
        setDeletedItem([deletedItem]);
    };

    return (
        <StyledBiggerContainer>
            <StyledBigContainer>
                <StyledLeftContainer>
                    <StyledImage href={`/product/${id}`}>
                        <img src={imgSrc} alt={imgSrc} />
                    </StyledImage>
                    <StyledDetails isMin={itemQ === 1} isMax={itemQ === stockMaxQuantity}>
                        <Toaster />
                        <div className="title">{title}</div>
                        <div>${price} TWD</div>
                        <br />
                        <div>Size &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{size}</div>
                        <div >Color &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="color">{getColorNameByCode(color)}</span></div>
                        <div>Quantity &nbsp;&nbsp;&nbsp; <button className="minus" onClick={decrease}>-</button> &nbsp;&nbsp;&nbsp;{itemQ}&nbsp;&nbsp;&nbsp; <button className="plus" onClick={increase}>+</button></div>
                    </StyledDetails>
                </StyledLeftContainer>

                <StyledRight>
                    <button className="removeItem" onClick={removeAItem}>X</button>
                    <div>${price * itemQ} TWD</div>
                </StyledRight>
            </StyledBigContainer>
            <Liner />
        </StyledBiggerContainer>
    )
};

export default CartItem;
