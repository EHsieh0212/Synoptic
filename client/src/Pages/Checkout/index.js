import {
    BigContainer, StyledShoppingBag, StyledItemContainer, StyledOrderSummary,
    OrderInfoContainer, OrderInfo, Liner, ProceedToCheckout, PaymentAcception, PayKind, PrivacyInfo
} from './checkoutStyle';
import CartItem from './CartItem';
import YourCartIsEmpty from './YourCartIsEmpty';
import { useState, useEffect, useCallback } from 'react';
import { catchErrors } from '../../Utils';
import { CART_API_URL } from '../../Utils/product';
import { GET_REQUEST_OPTIONS, PUT_REQUEST_OPTIONS } from '../../Utils';
import Loader from '../../Components/Loader';
import mastercard from "../../Assests/mastercard.png";
import visa from "../../Assests/visa.png";
import paypal from "../../Assests/paypal.png"

const Checkout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [newCartItems, setNewCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [newTotalPrice, setNewTotalPrice] = useState(0);
    const [updatedItem, setUpdatedItem] = useState([]);
    const [renewed, setRenewed] = useState(false);
    const [deletedItem, setDeletedItem] = useState([]);

    // (A) for starters
    // (1) get cart item from redis
    useEffect(() => {
        const fetchCartItems = catchErrors(async () => {
            const data = await fetch(CART_API_URL, GET_REQUEST_OPTIONS);
            const result = await data.json();
            const wholeCart = result.cart
            setCartItems(wholeCart);
            setIsLoading(false);
        });
        fetchCartItems();
    }, []);

    // (2) calculate initial total price
    // prevent initializing a new updateCartInfo func everytime the component renders, this is for optimizing React
    const updateTotalPriceInfo = useCallback(() => {
        let initTotalPrice = 0;
        cartItems.forEach(item => {
            const temp = item.price * item.incrementBy;
            initTotalPrice += temp;
        });
        setTotalPrice(initTotalPrice);
    }, [cartItems]);

    useEffect(() => {
        if (cartItems.length > 0) {
            updateTotalPriceInfo();
        }
    }, [cartItems, updateTotalPriceInfo]);

    // (B)
    // (B-1) update new cartItem, store them back to redis
    const updateRedis = async (newCartInfo) => {
        const requestOptions = PUT_REQUEST_OPTIONS(JSON.stringify(newCartInfo));
        const response = await fetch(`${CART_API_URL}/modifier`, requestOptions);
        if (!response.ok) {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.message || `Request failed with status ${response.status}`;
            throw new Error(errorMessage);
        }
    };
    useEffect(() => {
        const comparison = renewed ? newCartItems : cartItems;
        if (updatedItem.length > 0) {
            const newItem = updatedItem[0];
            const renewedCartItems = comparison.map(cartItem => {
                if (newItem.color === cartItem.color &&
                    newItem.size === cartItem.size &&
                    newItem.title === cartItem.title) {
                    return {
                        ...cartItem,
                        incrementBy: newItem.incrementBy,
                        stockMaxQuantity: newItem.stockMaxQuantity
                    };
                }
                return cartItem;
            });
            setNewCartItems(renewedCartItems);
            setRenewed(true);
            updateRedis(renewedCartItems);
        }
        if (deletedItem.length > 0) {
            const toDelete = deletedItem[0];
            const filteredCart = comparison.filter(item => (
                item.title !== toDelete.title ||
                item.size !== toDelete.size ||
                item.color !== toDelete.color
            ));
            setNewCartItems(filteredCart);
            updateRedis(filteredCart);
            localStorage.setItem("cartLength", filteredCart.length);
            window.dispatchEvent(new Event("storage"));
            setIsLoading(true);
            window.location.reload();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renewed, deletedItem, updatedItem, cartItems]);


    // (B-2) update new total price when cartItems renewed
    const updateRenewedTotalPriceInfo = useCallback(() => {
        let initTotalPrice = 0;

        newCartItems.forEach(item => {
            const temp = item.price * item.incrementBy;
            initTotalPrice += temp;
        });
        setNewTotalPrice(initTotalPrice);
    }, [newCartItems]);

    useEffect(() => {
        if (newCartItems.length > 0) {
            updateRenewedTotalPriceInfo();
        }
    }, [newCartItems, updateRenewedTotalPriceInfo]);


    return (
        <div>
            {isLoading ? (<Loader />) :
                (cartItems && cartItems.length > 0 ?
                    (<BigContainer>
                        <StyledShoppingBag>
                            <div className='title'>shopping bag info</div>
                            <Liner />
                            <StyledItemContainer>
                                {
                                    cartItems.map(item => (
                                        <div>
                                            <CartItem
                                                id={item.productId}
                                                key={`${item.productId}_${item.color}_${item.size}`}
                                                imgSrc={item.imgSrc}
                                                title={item.title}
                                                price={item.price}
                                                size={item.size}
                                                color={item.color}
                                                quantity={item.incrementBy}
                                                stockMaxQuantity={item.stockMaxQuantity}
                                                setUpdatedItem={setUpdatedItem}
                                                setDeletedItem={setDeletedItem}
                                            />
                                        </div>
                                    ))
                                }
                            </StyledItemContainer>
                        </StyledShoppingBag>

                        <StyledOrderSummary>
                            <div className='title'>order summary</div>
                            <Liner />
                            <br />
                            <OrderInfoContainer>
                                <OrderInfo>
                                    <div>Order Value </div>
                                    <div>${!renewed ? totalPrice : newTotalPrice} TWD</div>
                                </OrderInfo>
                                <OrderInfo>
                                    <div>Delivery</div>
                                    <div className='delivery'>Free</div>
                                </OrderInfo>
                                <Liner />
                                <br />
                                <OrderInfo>
                                    <div>Total</div>
                                    <div>${!renewed ? totalPrice : newTotalPrice} TWD</div>
                                </OrderInfo>

                            </OrderInfoContainer>
                            <br />
                            <ProceedToCheckout>Proceed to checkout</ProceedToCheckout>
                            <br />
                            <PaymentAcception>
                                WE ACCEPT
                                <PayKind>
                                    <img src={visa}/>
                                    <img src={mastercard}/>
                                    <img src={paypal}/>
                                </PayKind>
                                <PrivacyInfo>Your personal data will be shared with Klarna for order checkout and payment. For more information about processing and protection of personal data, read our Privacy Notice.</PrivacyInfo>
                            </PaymentAcception>
                        </StyledOrderSummary>

                    </BigContainer>) : (
                        <YourCartIsEmpty />
                    )
                )}
        </div >

    )
};

export default Checkout;