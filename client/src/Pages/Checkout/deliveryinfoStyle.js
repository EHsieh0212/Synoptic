import { styled } from '@mui/system';
import { Toaster, ToastBar } from 'react-hot-toast';
import { Button } from '@mui/material';

export const StyledTextField = styled('div')({
    '& .MuiInputLabel-root': {
        fontSize: '14px',
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
    '& .customDatePickerWidth': {
        width: '100%',
        '& > div.react-datepicker-wrapper': {
            width: '100%',
            '& > div > div.react-datepicker__input-container': {
                width: '100%',
                '& input': {
                    width: '100%',
                },
            },
        },
    },
});

export const StyledButton = styled(Button)(({ colorLock }) => ({
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: colorLock ? 'black' : 'gray',
      cursor: colorLock ? 'default' : 'pointer',
    },
  }));

export const StyledToaster = () => {
    return (
        <Toaster
            position={'top-center'}
            toastOptions={{
                className: '',
                style: {
                    minWidth: '300px',
                    fontSize: '15px',
                    textAlign: 'left'
                },
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            }}>
            {(t) => (
                <ToastBar
                    toast={t}
                    style={{
                        ...t.style,
                        animation: t.visible ? 'custom-enter 0.5s ease' : 'custom-exit 0.5s ease',
                        textAlign: 'left',
                    }}
                >
                    {({ icon, message }) => (
                        <>
                            {icon}
                            {message}
                        </>
                    )}

                </ToastBar>
            )}
        </Toaster>
    )
};