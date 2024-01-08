import { BigContainer, StyledShoppingBag, StyledItemContainer, StyledOrderSummary, Liner } from './checkoutStyle';
import CartItem from './CartItem';
import { useState, useEffect } from 'react';
import { catchErrors } from '../../Utils';
import { CART_API_URL } from '../../Utils/product';
import { GET_REQUEST_OPTIONS } from '../../Utils';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCartItems = catchErrors(async () => {
            const data = await fetch(CART_API_URL, GET_REQUEST_OPTIONS);
            const result = await data.json();
            setCartItems(result.cart);
        });
        fetchCartItems();
    }, []);

    return (
        <div>
            <BigContainer>
                <StyledShoppingBag>
                    <div className='title'>shopping bag info</div>
                    <Liner />
                    <StyledItemContainer>
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <div key={`${item.productId}_${item.color}_${item.size}`}>
                                    <CartItem
                                        imgSrc={item.imgSrc}
                                        title={item.title}
                                        price={item.price}
                                        size={item.size}
                                        color={item.color}
                                        quantity={item.incrementBy}
                                    />
                                </div>
                            ))
                        ) : (
                            <div>Sorry, no items</div>
                        )}
                    </StyledItemContainer>
                </StyledShoppingBag>

                <StyledOrderSummary>
                    <div className='title'>order summary</div>
                    <Liner />
                    <div>Total Price: {totalPrice}</div>
                </StyledOrderSummary>

            </BigContainer>
        </div >

    )
};

export default Checkout;