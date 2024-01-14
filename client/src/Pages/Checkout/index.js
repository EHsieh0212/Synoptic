import DeliveryInfo from './DeliveryInfo';
import { BigContainer } from './checkoutStyle'

const Checkout = () => {
    return (
        <BigContainer>
            <DeliveryInfo className='delivery'/>
            <div className='test' >Cart Info</div>
        </BigContainer>
    );
};

export default Checkout;
