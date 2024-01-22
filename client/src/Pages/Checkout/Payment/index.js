import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { getTPDirect } from '../../../Utils/tappay';
import { catchErrors } from "../../../Utils";
import mastercard from "../../../Assests/mastercard.png";
import visa from "../../../Assests/visa.png";
import paypal from "../../../Assests/paypal.png"
import { Grid, Typography } from '@mui/material';
import { StyledButton, StyledToaster } from '../deliveryinfoStyle';
import styled from "styled-components";


const StyledInputs = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: '40px';
`;

const StyledInputs2 = styled.div`
    display: flex;
    flex-direction: column;
    /* overflow: hidden;  */
    height: '40px';
`;

const StyledTP = styled.div`
    display: inline-block;
`

const Payment = () => {
    const APP_ID = process.env.REACT_APP_TP_APPID;
    const APP_KEY = process.env.REACT_APP_TP_APPKEY;
    const [submitDisable, setSubmitDisable] = useState(true);
    let creditCardRef = useRef(0);
    let dueDateCardRef = useRef('12/30');
    let ccvCardRef = useRef(0);

    const navigate = useNavigate();

    useEffect(() => {
        getTPDirect().then((TPDirect) => {
            TPDirect.setupSDK(APP_ID, APP_KEY, 'sandbox');
            TPDirect.card.setup({
                fields: {
                    number: {
                        element: creditCardRef,
                        placeholder: '**** **** **** ****'
                    },
                    expirationDate: {
                        element: dueDateCardRef,
                        placeholder: ''
                    },
                    ccv: {
                        element: ccvCardRef,
                        placeholder: 'ccv'
                    }
                },
                styles: {
                    'input': {
                        'color': '#D3D3D3',
                        'font-size': '13px',
                        'line-height': '20px',
                    },
                    ':focus': {
                        'color': 'black'
                    },
                    '.valid': {
                        'color': 'green'
                    },
                    '.invalid': {
                        'color': 'red'
                    }
                },
                isMaskCreditCardNumber: true,
                maskCreditCardNumberRange: {
                    beginIndex: 6,
                    endIndex: 11
                }
            })

            TPDirect.card.onUpdate(update => {
                update.canGetPrime ? setSubmitDisable(false) : setSubmitDisable(true);
            })
        })
    }, [APP_ID, APP_KEY]);

    const onSubmit = catchErrors((event) => {
        event.preventDefault();
        getTPDirect().then((TPDirect) => {
            const tappayStatus = TPDirect.card.getTappayFieldsStatus();
            if (tappayStatus.canGetPrime === false) {
                return alert('can not get prime');
            }
            TPDirect.card.getPrime((result) => {
                console.log(TPDirect.card)
                console.log(creditCardRef)
                console.log(dueDateCardRef)
                console.log(result)
                toast('success');
            })
        })

    })

    return (
        <Grid container justifyContent="center" alignItems="left" style={{ minHeight: '10vh', marginTop: '80px', paddingBottom: '0px' }} >
            <Grid item xs={12} sm={12} md={12} style={{ margin: '0px', padding: '0px' }}>
                <Typography variant="h5" align="left" gutterBottom style={{ marginBottom: '20px', paddingBottom: '0px', fontSize: '21px', fontWeight: 'bold' }}>
                    Payment Information
                </Typography>

                <div id="cardview-container" className="cardview-container">
                    <StyledToaster />
                    <Grid container style={{ border: '1px solid #909090', borderRadius: '4px' }}>
                        <Grid item xs={12} style={{ width: '100%', padding: '0px', margin: '0px' }}>
                            <StyledInputs >
                                <div className="tpfield" name='creditCard' ref={el => (creditCardRef = el)} style={{ border: '1px solid #909090', width: '100%', height: '40px', fontSize: '13px', maxlength: "16" }} />
                            </StyledInputs>
                        </Grid>
                        <Grid item xs={12} style={{ width: '100%', padding: '0px', margin: '0px', position: 'relative', zIndex: 1 }}>
                            <StyledInputs2 >
                                <StyledTP className="tpfield" name='dueDate' ref={el => (dueDateCardRef = el)} style={{ border: '1px solid #909090', width: '100%', height: '40px', fontSize: '13px', zIndex: 1 }}></StyledTP>
                            </StyledInputs2>
                        </Grid>
                        <Grid item xs={12} style={{ padding: '0px', margin: '0px', position: 'relative', zIndex: 2 }}>
                            <StyledInputs >
                                <div className="tpfield" name='cvv' ref={el => (ccvCardRef = el)} style={{ border: '1px solid #909090', width: '100%', height: '40px', fontSize: '13px', maxlength: "16", zIndex: 2 }}></div>
                            </StyledInputs>
                        </Grid>


                    </Grid>
                    <div style={{ marginTop: '20px', width: '100%', padding: '0px' }}>
                        <StyledButton disabled={submitDisable} onClick={onSubmit} isShow={submitDisable}>submit</StyledButton>
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
                </div>
            </Grid>
        </Grid >
    )
}

export default Payment;
