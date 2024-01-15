import { useState } from 'react';
import DeliveryInfo from './DeliveryInfo';
import Payment from './Payment';
import CartInfo from './CartInfo';
import { BigContainer, LeftContainer } from './checkoutStyle'

const Checkout = () => {
    const [showPayment, setShowPayment] = useState(false);

    const handleShowPayment = () => {
        setShowPayment(true);
    }
    return (
        <BigContainer>
            <LeftContainer className="leftContainer">
                <DeliveryInfo className='delivery' handleShowPayment={handleShowPayment} />
                {showPayment ? (<><Payment /></>) : (<div></div>)}
            </LeftContainer>
            <CartInfo />
        </BigContainer>
    );
};

export default Checkout;
