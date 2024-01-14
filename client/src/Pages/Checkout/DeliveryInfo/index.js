import styled from "styled-components";
import { useState } from 'react';
import { TextField, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const StyledDeliveryInfo = styled.div`
  padding: 0px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
  margin: 0;
  /* width: 50%; */
`;

const DeliveryInfo = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    const [preferredDeliveryTime, setPreferredDeliveryTime] = useState('');

    const handlePreferredDeliveryTimeChange = (event) => {
        setPreferredDeliveryTime(event.target.value);
    };

    return (
        <Grid container justifyContent="left" alignItems="left" style={{ minHeight: '100vh' }}>
            <Grid item xs={10} sm={8} md={6}>
                <StyledDeliveryInfo>
                    <Typography variant="h5" align="center" gutterBottom>
                        Delivery Information
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Country" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Email Address" variant="outlined" fullWidth required type="email" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Postal Code" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="First Name" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Last Name" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Address" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Address Details" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="City Region" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Mobile Phone" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="preferredDeliveryTime-label">Preferred Delivery Time</InputLabel>
                                    <Select
                                        labelId="preferredDeliveryTime-label"
                                        id="preferredDeliveryTime"
                                        value={preferredDeliveryTime}
                                        label="Preferred Delivery Time"
                                        onChange={handlePreferredDeliveryTimeChange}
                                    >
                                        <MenuItem value="morning">Morning</MenuItem>
                                        <MenuItem value="afternoon">Afternoon</MenuItem>
                                        <MenuItem value="not-specified">Not Specified</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <div style={{ marginTop: '20px' }}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                        </div>
                    </form>
                </StyledDeliveryInfo>
            </Grid>
        </Grid>
    );

};

export default DeliveryInfo;
