import { useState, useEffect, useCallback } from 'react';
import DeliveryInfo from './DeliveryInfo';
import Payment from './Payment';
import CartInfo from './CartInfo';
import { BigContainer, LeftContainer } from './checkoutStyle';
import Loader from '../../Components/Loader';
import YourCartIsEmpty from '../../Components/YourCartIsEmpty';
import { catchErrors, GET_REQUEST_OPTIONS } from '../../Utils';
import { CART_API_URL } from '../../Utils/product';

const Checkout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [verifiedDeliveryInfo, setVerifiedDeliveryInfo] = useState(0);


    useEffect(() => {
        const fetchCartItems = catchErrors(async () => {
            const data = await fetch(CART_API_URL, GET_REQUEST_OPTIONS);
            if (!data.ok) {
                const error = await data.json();
                console.error("Cannot retrieve data error:", error);
                setIsLoading(false);
                return;
            }
            const result = await data.json();
            const wholeCart = result.cart;
            setCartItems(wholeCart);
            setIsLoading(false);
        });
        fetchCartItems();
    }, []);

    const updateTotalPriceInfo = useCallback(() => {
        let initTotalPrice = 0;
        cartItems.forEach(item => {
            const temp = item.price * item.incrementBy;
            initTotalPrice += temp;
        });
        setTotalPrice(initTotalPrice);
    }, [cartItems]);

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            updateTotalPriceInfo();
        }
    }, [cartItems, updateTotalPriceInfo]);


    return (
        <div>
            {isLoading ? (<Loader />) : (
                cartItems && cartItems.length > 0 ? (
                    <BigContainer>
                        <LeftContainer className="leftContainer">
                            <DeliveryInfo className='delivery' getVerifiedDeliveryInfo={setVerifiedDeliveryInfo}/>
                            {verifiedDeliveryInfo ? (<Payment verifiedDeliveryInfo={verifiedDeliveryInfo}/>) : (<div></div>)}
                        </LeftContainer>
                        <CartInfo className="rightCartInfo" cartItems={cartItems} totalPrice={totalPrice}/>
                    </BigContainer>
                ) : (<YourCartIsEmpty />)
            )}
        </div>
    );
    
};

export default Checkout;
