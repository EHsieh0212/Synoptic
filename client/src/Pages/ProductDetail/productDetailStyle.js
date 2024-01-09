import styled from "styled-components";
import { toast, Toaster, ToastBar } from 'react-hot-toast';

export const BigContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 30px;
    margin-left: 300px;
    padding-right: 0px;
    padding-bottom: 120px;
    max-width: 100%;
`;

export const StyledImage = styled.div`
  display: block; /** */
  text-align: center; /** */
  padding:0;
  margin: 0;
  img{
    width: 100%;
    height: 680px; 
  }
`;

export const StyledRight = styled.div`
    padding-left: 150px;
    padding-right: 0px;
    width:50%;
`;

export const RightUp = styled.div`
    padding-bottom: 40px;
`;

export const StyledTitle = styled.div`
    font-size: 20px;
    text-transform: uppercase;
`;

export const StyledPrice = styled.div`
    font-size: 16px;
`;

export const RightMiddle = styled.div`
    padding-bottom: 30px;
`;

export const MiddleText = styled.div`
    font-size: 13px;
    text-transform: uppercase;
    padding-bottom: 5px;
    text-decoration: underline;
`;

export const SizeBlockContainer = styled.div`
    display: flex;
    gap: 12px;
`;

export const SizeBlock = styled.button`
    display: inline-block;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    gap: 5px;
    border: 1px solid #D8D8D8;
    :hover{
        cursor: pointer;
    }
    font-size: 14px;
    font-weight: 400;
    background-color: ${props => props.isPicked ? '#E0E0E0' : 'initial'};
`;

export const DescriptionText = styled.div`
    /* width: 40%; */
    font-size: 13px;
    padding:0px;
    margin: 0px;
`;

export const AddToBag = styled.button`
  text-transform: uppercase;
  margin-top: 10px;
  box-sizing: border-box; /*  box includes not only content, but also border/padding */
  height: 45px;
  width: 550px; /* same as select menu bar's width*/
  font-size: 12px;
  font-weight: 450;
  background-color: black;
  border: none;
  color:white;
  :hover{
    background-color: gray; 
  }
  a{
    color: white;
    text-decoration: none; /* Link will eventually renders into a, so this assignment is working. */
  }
`;


export const StyledToaster = () => {
    return (
        <Toaster
            position={'top-center'}
            duration={100}
            toastOptions={{
                className: '',
                style: {
                    minWidth: '350px',
                    padding: '15px',
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
                        animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
                    }}
                >
                    {({ icon, message }) => (
                        <>
                            {icon}
                            {message}
                            {t.type !== 'loading' && (
                                <button style={{ border: 'none', background: 'transparent' }} onClick={() => toast.dismiss(t.id)}>X</button>
                            )}
                        </>
                    )}

                </ToastBar>
            )}
        </Toaster>
    )
};