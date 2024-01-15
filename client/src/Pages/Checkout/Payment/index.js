import { useState } from 'react';
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


registerLocale('zhTW', zhTW);

const Payment = () => {
    const [formData, setFormData] = useState({
        creditCard: '',
        dueDate: '',
        cvv: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, dueDate: date });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const [creditCardOk, cvvOk] = validatePayment(formData);
        if (!creditCardOk){
            toast('Please enter valid credit card number', { id: 'uniqueID', duration: 1500, icon: '💡', });
        } else if (!cvvOk){
            toast('Please enter valid CVV number', { id: 'uniqueID', duration: 1500, icon: '💡', });
        } else{
            toast('success', { id: 'uniqueID', duration: 1500, icon: '💡', });
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="left" style={{ minHeight: '10vh', marginTop: '80px', paddingBottom: '0px' }}>
            <Grid item xs={12} sm={12} md={12} style={{ margin: '0px', padding: '0px' }}>
                <Typography variant="h5" align="left" gutterBottom style={{ marginBottom: '20px', paddingBottom: '0px', fontSize: '21px', fontWeight: 'bold' }}>
                    Payment Information
                </Typography>
                <form onSubmit={handleSubmit}>
                    <StyledToaster />
                    <Grid container style={{ border: '1px solid #909090', borderRadius: '4px' }}>
                        <Grid item xs={12} style={{ padding: '0px', margin: '0px' }}>
                            <StyledTextField>
                                <TextField
                                    label="Credit Cart Number"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    InputProps={{
                                        onChange: handleInputChange,
                                        name: 'creditCard',
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px',
                                            fontSize: '15px'
                                        },
                                    }} />
                            </StyledTextField>
                        </Grid>
                        <Grid item xs={12} style={{ width: '100%', padding: '0px', margin: '0px' }}>
                            <StyledTextField >
                                <div className='customDatePickerWidth'>
                                    <DatePicker
                                        locale="zhTW"
                                        selected={formData.dueDate}
                                        onChange={handleDateChange}
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
                                        customInput={
                                            <TextField
                                                label="Due Date"
                                                variant="outlined"
                                                fullWidth
                                                required
                                                InputProps={{
                                                    style: {
                                                        border: 'none',
                                                        borderRadius: '0px',
                                                        fontSize: '15px',
                                                    },
                                                }}
                                            />
                                        }
                                    />
                                </div>
                            </StyledTextField>
                        </Grid>
                        <Grid item xs={12} style={{ padding: '0px', margin: '0px' }}>
                            <StyledTextField >
                                <TextField
                                    label="CV code"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    InputProps={{
                                        onChange: handleInputChange,
                                        name: 'cvv',
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px',
                                            fontSize: '15px'
                                        },
                                    }} />
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