import { useState } from 'react';
import DeliveryInfo from './DeliveryInfo';
import { BigContainer } from './checkoutStyle'

const Checkout = () => {
    const [showPayment, setShowPayment] = useState(false);

    const handleShowPayment = () => {
        setShowPayment(true);
    }

    return (
        <BigContainer>
            <DeliveryInfo className='delivery' handleShowPayment={handleShowPayment}/>
            {showPayment ? (<div className='test' >Cart Info</div>) : (<div className='test'>x</div>)}
            
        </BigContainer>
    );
};

export default Checkout;
