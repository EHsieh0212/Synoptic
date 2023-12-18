import styled, { keyframes } from 'styled-components';
import model from '../../Assests/model.png';
import React, { useState, useEffect, useRef } from 'react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledCompartment = styled.div`
    display: flex;
    padding-bottom: 150px;
    justify-content: center;
    padding-top: 0px;
    margin: 0;
    gap: 30px; /* spaces between elements */
`;

const StyledText = styled.p`
  opacity: ${props => (props.isVisible ? '1' : '0')};
  transition: opacity 0.5s ease-in-out;
  font-size: 20px;
  text-align: center;
  font-style: italic;
  font-weight: 500;
  padding-top: 250px;
  padding-bottom: 150px;
  animation: ${fadeIn} 1s ease-in-out forwards;
`;

const StyledModel = styled.div`
`;

const FashionText = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    // this fade in is not working currently. fix later
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5,
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <StyledCompartment ref={ref}>
            <StyledText  isVisible={isVisible}>
                Curators of eclectic fashion and Taiwan designed. <br />
                Synoptic is a destination concept store and online haven for style-seekers. <br />
                A fashion selection lovingly handpicked for you, sealed with personal touch. <br />
                Open seven days.
            </StyledText>
            <StyledModel>
                <img src={model} alt="model" />
            </StyledModel>
        </StyledCompartment>
    );
};

export default FashionText;
