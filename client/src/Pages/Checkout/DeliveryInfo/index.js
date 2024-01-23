import { useState } from 'react';
import { TextField, Grid, Typography } from '@mui/material';
import { validateDelivery } from '../../../Utils/validate';
import toast from 'react-hot-toast';
import { StyledTextField, StyledButton, StyledToaster, StyledEditDelivery } from '../deliveryinfoStyle';

const DeliveryInfo = ({ setVerifiedDeliveryInfo, cartItems, totalPrice }) => {
    const [formData, setFormData] = useState({
        email: '',
        postalCode: '',
        firstName: '',
        lastName: '',
        address: '',
        addressDetails: '',
        phone: '',
        amount: 0,
        cartDetails: []
    });
    const [validateSuccess, setValidateSuccess] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const editDelivery = () => {
        setFormSubmitted(false);
        setValidateSuccess(false);
        setVerifiedDeliveryInfo(0);
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const [emailOk, postCodeOk, phoneOk] = validateDelivery(formData);
        if (!emailOk) {
            toast('Please enter valid email', { id: 'uniqueID', duration: 1500, icon: '💡', });
        } else if (!postCodeOk) {
            toast('Please enter valid postcode', { id: 'uniqueID', duration: 1500, icon: '💡', });
        } else if (!phoneOk) {
            toast('Please enter valid phone number', { id: 'uniqueID', duration: 1500, icon: '💡', });
        } else {
            setValidateSuccess(true);
            setFormSubmitted(true);
            setFormData({
                ...formData,
                amount: totalPrice,
                cartDetails: cartItems.map(item => ({
                    productId: item.productId,
                    size: item.size,
                    color: item.color,
                    quantity: item.incrementBy,
                    variantId: item.variantId
                }))
            });
            setVerifiedDeliveryInfo(formData);
        }
    };

    return (
        <Grid container justifyContent="flex-start" alignItems="left" style={{ minHeight: '50vh', margin: 0, paddingBottom: '0px' }}>
            <Grid item xs={12} sm={12} md={12} style={{ margin: '0px', padding: '0px' }}>
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
                                    }}
                                    disabled={formSubmitted} />
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
                                    }}
                                    disabled={formSubmitted} />
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
                                    }}
                                    disabled={formSubmitted} />
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
                                    }}
                                    disabled={formSubmitted} />
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
                                    }}
                                    disabled={formSubmitted} />
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
                                    }}
                                    disabled={formSubmitted} />
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
                                    }}
                                    disabled={formSubmitted} />
                            </StyledTextField>
                        </Grid>

                    </Grid>
                    <div style={{ marginTop: '20px', width: '100%', padding: '0px' }}>
                        <StyledButton
                            type="submit"
                            variant="contained"
                            fullWidth
                            colorLock={formSubmitted}>
                            {validateSuccess ? "Validate Success" : "Continue"}
                        </StyledButton>
                    </div>
                    {validateSuccess ? (<StyledEditDelivery onClick={editDelivery}> edit delivery </StyledEditDelivery>) : (<div></div>)}
                </form>
            </Grid>
        </Grid >
    );

};

export default DeliveryInfo;
