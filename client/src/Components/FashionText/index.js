import styled from 'styled-components';
import model from '../../Assests/model.png';
import { useState, useEffect, useRef } from 'react';

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
`;

const StyledModel = styled.div`
`;

const FashionTextWrapper = styled.div`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const FashionText = () => {
    const [isVisible, setIsVisible] = useState(false);
    const fashionTextRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY + window.innerHeight;
          const elementPosition = fashionTextRef.current.offsetTop;
    
          if (scrollPosition < elementPosition) {
            setIsVisible(false);
          }
          
          if (scrollPosition > elementPosition && !isVisible) {
            setIsVisible(true);
          }
        };
        //** when scrolls, uses handleScroll
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [isVisible]);


    return (
        <FashionTextWrapper ref={fashionTextRef} isVisible={isVisible}>
            <StyledCompartment>
                <StyledText isVisible={isVisible}>
                    Curators of eclectic fashion and Taiwan designed. <br />
                    Synoptic is a destination concept store and online haven for style-seekers. <br />
                    A fashion selection lovingly handpicked for you, sealed with personal touch. <br />
                    Open seven days.
                </StyledText>
                <StyledModel>
                    <img src={model} alt="model" />
                </StyledModel>
            </StyledCompartment>
        </FashionTextWrapper>
    );
};

export default FashionText;
