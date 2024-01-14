import { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledTextField = styled('div')({
    '& .MuiInputLabel-root': {
        fontSize: '14px', // Set your desired font size for the label
      },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent',
            borderBottom: '1px solid lightgray',
        },
        '&:hover fieldset': {
            borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent',
        },
    },
    '& input': {
        border: 'none',
        borderBottom: '1px solid lightgray',
        borderRadius: '0px',
    },
});


const StyledButton = styled(Button)({
    width: '100%', 
    backgroundColor: 'black', 
    color: 'white', 
  });


const DeliveryInfo = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    const [preferredDeliveryTime, setPreferredDeliveryTime] = useState('');

    const handlePreferredDeliveryTimeChange = (event) => {
        setPreferredDeliveryTime(event.target.value);
    };

    return (
        <Grid container justifyContent="center" alignItems="left" style={{ minHeight: '100vh', margin: 0 }}>
            <Grid item xs={10} sm={8} md={6} style={{ margin: '0px', padding: '0px' }}>
                <Typography variant="h5" align="left" gutterBottom style={{ paddingBottom: '20px', fontSize: '21px', fontWeight: 'bold' }}>
                    Delivery Information
                </Typography>
                <form onSubmit={handleSubmit} >
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
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px'
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
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px'
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
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px'
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
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px'
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
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px'
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
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px'
                                        },
                                    }} />
                            </StyledTextField>
                        </Grid>
                        <Grid item xs={12} style={{ padding: '0px', margin: '0px' }}>
                            <StyledTextField>
                                <TextField
                                    label="Mobile Phone"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    InputProps={{
                                        style: {
                                            border: 'none',
                                            borderRadius: '0px'
                                        },
                                    }} />
                            </StyledTextField>
                        </Grid>

                    </Grid>
                    <div style={{ marginTop: '20px', width: '100%', padding:'0px' }}>
                        <StyledButton type="submit" variant="contained" fullWidth>
                            Continue
                        </StyledButton>
                    </div>
                </form>
            </Grid>
        </Grid >
    );

};

export default DeliveryInfo;
