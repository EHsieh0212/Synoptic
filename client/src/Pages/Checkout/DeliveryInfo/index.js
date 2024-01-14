import { useState } from 'react';
import { TextField, Grid, Typography } from '@mui/material';
import { validateDelivery } from '../../../Utils/validate';
import toast from 'react-hot-toast';
import { StyledTextField, StyledButton, StyledToaster } from './deliveryinfoStyle';


const DeliveryInfo = ({ handleShowPayment }) => {
    const [formData, setFormData] = useState({
        email: '',
        postalCode: '',
        firstName: '',
        lastName: '',
        address: '',
        addressDetails: '',
        phone: '',
    });
    const [validateSuccess, setValidateSuccess] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateDelivery(formData)[0]) {
            const [finalOk, emailOk, postCodeOk, phoneOk] = validateDelivery(formData);
            if (!emailOk) {
                toast('Please enter valid email', { id: 'uniqueID', duration: 1500, icon: '💡', });
            } else if (!postCodeOk) {
                toast('Please enter valid postcode', { id: 'uniqueID', duration: 1500, icon: '💡', });
            } else {
                toast('Please enter valid phone number', { id: 'uniqueID', duration: 1500, icon: '💡', });
            }
            return;
        }
        setValidateSuccess(true);
        handleShowPayment();
    };

    return (
        <Grid container justifyContent="center" alignItems="left" style={{ minHeight: '100vh', margin: 0 }}>
            <Grid item xs={10} sm={8} md={6} style={{ margin: '0px', padding: '0px' }}>
                <Typography variant="h5" align="left" gutterBottom style={{ paddingBottom: '20px', fontSize: '21px', fontWeight: 'bold' }}>
                    Delivery Information
                </Typography>
                <form onSubmit={handleSubmit} >
                    <StyledToaster />
                    <Grid container style={{ border: '1px solid #909090', borderRadius: '4px' }}>
                        <Grid item xs={12} style={{ padding: '0px', margin: '0px' }}>
                            <StyledTextField>
                                <TextField
                                    label="Email Address"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    type="email"
                                    InputProps={{
                                        onChange: handleInputChange,
                                        name: 'email',
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px',
                                            fontSize: '15px'
                                        },
                                    }} />
                            </StyledTextField>
                        </Grid>
                        <Grid item xs={12} style={{ padding: '0px', margin: '0px' }}>
                            <StyledTextField>
                                <TextField
                                    label="Postal Code"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    InputProps={{
                                        onChange: handleInputChange,
                                        name: 'postalCode',
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px',
                                            fontSize: '15px'
                                        },
                                    }} />
                            </StyledTextField>
                        </Grid>
                        <Grid item xs={6} style={{ padding: '0px', margin: '0px' }}>
                            <StyledTextField>
                                <TextField
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    InputProps={{
                                        onChange: handleInputChange,
                                        name: 'firstName',
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px',
                                            fontSize: '15px'
                                        },
                                    }} />
                            </StyledTextField>
                        </Grid>
                        <Grid item xs={6} style={{ padding: '0px', margin: '0px' }}>
                            <StyledTextField>
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    InputProps={{
                                        onChange: handleInputChange,
                                        name: 'lastName',
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px',
                                            fontSize: '15px'
                                        },
                                    }} />
                            </StyledTextField>
                        </Grid>
                        <Grid item xs={12} style={{ padding: '0px', margin: '0px' }}>
                            <StyledTextField>
                                <TextField
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    InputProps={{
                                        onChange: handleInputChange,
                                        name: 'address',
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px',
                                            fontSize: '15px'
                                        },
                                    }} />
                            </StyledTextField>
                        </Grid>
                        <Grid item xs={12} style={{ padding: '0px', margin: '0px' }}>
                            <StyledTextField>
                                <TextField
                                    label="Address Details"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        onChange: handleInputChange,
                                        name: 'addressDetails',
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px',
                                            fontSize: '15px'
                                        },
                                    }} />
                            </StyledTextField>
                        </Grid>
                        <Grid item xs={12} style={{ padding: '0px', margin: '0px' }}>
                            <StyledTextField>
                                <TextField
                                    label="Mobile Phone Format: 09-xxxxxxxx"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    type='tel'
                                    InputProps={{
                                        onChange: handleInputChange,
                                        name: 'phone',
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
                            {validateSuccess? "Validate Success": "Continue" }
                        </StyledButton>
                    </div>
                </form>
            </Grid>
        </Grid >
    );

};

export default DeliveryInfo;
