import { useEffect, useState } from 'react';
import { TextField, Grid, Typography } from '@mui/material';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import zhTW from 'date-fns/locale/zh-TW';
import toast from 'react-hot-toast';
import { StyledTextField, StyledButton, StyledToaster } from '../deliveryinfoStyle';
import mastercard from "../../../Assests/mastercard.png";
import visa from "../../../Assests/visa.png";
import paypal from "../../../Assests/paypal.png"
import { validatePayment } from '../../../Utils/validate';
import { catchErrors } from "../../../Utils";
import { useTapPay } from 'react-native-tappay';
import { useNavigate } from 'react-router-dom';


registerLocale('zhTW', zhTW);
const Payment = ({ verifiedDeliveryInfo }) => {
    const [isPrime, setIsPrime] = useState(false);
    const [hasNumberError, setHasNumberError] = useState(false);
    const navigate = useNavigate();
    const appId = process.env.REACT_APP_TP_APPID;
    const appKey = process.env.REACT_APP_TP_APPKEY;
    const env = 'sandbox';
    const [isLoadedSuccess, TapPay] = useTapPay({ appId, appKey, env })
    const [paymentData, setPaymentData] = useState({
        creditCard: '',
        dueDate:'',
        dueMonth: '',
        dueYear:'',
        cvv: '',
    });


    const handleInputChange = (e) => {
        const trimmedValue = e.target.value.trim();
        setPaymentData({
            ...paymentData,
            [e.target.name]: trimmedValue,
        });
    };

    const handleDateChange = (date) => {
        const newDate = new Date(date);
        let year = newDate.getFullYear();
        year = year.toString().slice(-2)
        const month = (newDate.getMonth() + 1).toString();
        setPaymentData({ ...paymentData, dueDate: date, dueMonth: month, dueYear: year });
    };

    useEffect(() => {
        if (isLoadedSuccess) {
            TapPay.cardSetup({
                fields: {
                    number: {
                        element: '.card-number',
                        placeholder: ''
                    },
                    expirationDate: {
                        element: '.card-expiration-date',
                        placeholder: ''
                    },
                    ccv: {
                        element: '.card-ccv',
                        placeholder: ''
                    },
                },
            });
            TapPay.onCardUpdate(update => {
                const { canGetPrime, status } = update;
                setHasNumberError(status.number === 2);
                setIsPrime(canGetPrime);
            });
        }
    }, [isLoadedSuccess, TapPay]);

    // tappay
    const handleSubmit = catchErrors(async (event) => {
        event.preventDefault();
        const [creditCardOk, cvvOk] = validatePayment(paymentData);
        if (!creditCardOk) {
            toast('Please enter valid credit card number', { id: 'uniqueID', duration: 1500, icon: '💡', });
        } else if (!cvvOk) {
            toast('Please enter valid CVV number', { id: 'uniqueID', duration: 1500, icon: '💡', });
        } else {
            if (TapPay && paymentData) {
                TapPay.validateCard(paymentData.creditCard, paymentData.dueMonth, paymentData.dueYear, paymentData.cvv)
                    .then(result => {
                        TapPay.setCard(paymentData.creditCard, paymentData.dueMonth, paymentData.dueYear, paymentData.cvv);
                        TapPay.onCardUpdate(update => {
                            const { canGetPrime, status } = update;
                            setHasNumberError(status);
                            setIsPrime(canGetPrime);
                        });
                        if (isPrime) {
                            TapPay.getDirectPayPrime();
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
            // db transaction

            navigate('/thanks');
        }
    });


    return (
        <Grid container justifyContent="center" alignItems="left" style={{ minHeight: '10vh', marginTop: '80px', paddingBottom: '0px' }}>
            <Grid item xs={12} sm={12} md={12} style={{ margin: '0px', padding: '0px' }}>
                <Typography variant="h5" align="left" gutterBottom style={{ marginBottom: '20px', paddingBottom: '0px', fontSize: '21px', fontWeight: 'bold' }}>
                    Payment Information
                </Typography>
                <form onSubmit={handleSubmit}>
                    <StyledToaster />
                    <Grid container style={{ border: '1px solid #909090', borderRadius: '4px' }}>
                        <Grid className='tpfields' item xs={12} style={{ width: '100%', padding: '0px', margin: '0px' }}>
                            <StyledTextField>
                                {/* <TextField
                                    label="card-number"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    InputProps={{
                                        className: 'card-number',
                                        onChange: handleInputChange,
                                        name: 'creditCard',
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px',
                                            fontSize: '15px',
                                            width: '100%'
                                        },
                                    }} /> */}
                                <input
                                    name='creditCard'
                                    className='card-number'
                                    label='cart-number'
                                    placeholder='credit card number'
                                    style={{ width: '100%', height: '40px', fontSize: '13px', maxlength: "16" }}
                                    onChange={handleInputChange}
                                ></input>

                            </StyledTextField>
                        </Grid>
                        <Grid className='tpfields' item xs={12} style={{ width: '100%', padding: '0px', margin: '0px' }}>
                            <StyledTextField >
                                <div className='customDatePickerWidth'>
                                    <DatePicker
                                        locale="zhTW"
                                        selected={paymentData.dueDate}
                                        onChange={handleDateChange}
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
                                        label="card-expiration-date"
                                        customInput={
                                            // <TextField
                                            //     className="card-expiration-date"
                                            //     id='card-expiration-date'
                                            //     label="card-expiration-date"
                                            //     variant="outlined"
                                            //     fullWidth
                                            //     required
                                            //     InputProps={{
                                            //         style: {
                                            //             className: "card-expiration-date",
                                            //             border: 'none',
                                            //             borderRadius: '0px',
                                            //             fontSize: '15px',
                                            //         },
                                            //     }}
                                            // />
                                            <input
                                                className='card-expiration-date'
                                                style={{ width: '100%', height: '40px', fontSize: '13px' }}
                                                placeholder='credit card number'
                                            />
                                        }
                                    />
                                </div>
                            </StyledTextField>
                        </Grid>
                        <Grid className='tpfields' item xs={12} style={{ padding: '0px', margin: '0px' }}>
                            <StyledTextField >
                                {/* <TextField
                                    label="card-ccv"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    InputProps={{
                                        className: 'card-ccv',
                                        onChange: handleInputChange,
                                        name: 'cvv',
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px',
                                            fontSize: '15px'
                                        },
                                    }} /> */}
                                <input
                                    name='cvv'
                                    className='ccv'
                                    style={{ width: '100%', height: '40px', fontSize: '13px' }}
                                    onChange={handleInputChange}
                                    placeholder='cvv'></input>
                            </StyledTextField>
                        </Grid>

                    </Grid>
                    <div style={{ marginTop: '20px', width: '100%', padding: '0px' }}>
                        <StyledButton type="submit" variant="contained" fullWidth>
                            Submit
                        </StyledButton>
                    </div>
                    <Grid container spacing={2} style={{ justifyContent: 'center', marginTop: '0px' }}>
                        <Grid item xs={1.1}>
                            <img src={mastercard} alt="1" style={{ width: '100%', height: 'auto' }} />
                        </Grid>
                        <Grid item xs={1.1}>
                            <img src={visa} alt="2" style={{ width: '100%', height: 'auto' }} />
                        </Grid>
                        <Grid item xs={1.1}>
                            <img src={paypal} alt="3" style={{ width: '100%', height: 'auto' }} />
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid >
    );
};

export default Payment;