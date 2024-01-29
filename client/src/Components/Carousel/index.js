import Carousel from "react-bootstrap/Carousel";
import carousel from "../../Assests/carousel3.png";
import carousel5 from "../../Assests/carousel5.png";
import styled from 'styled-components';

const StyledCarousel = styled(Carousel)`
  padding-bottom: 300px;
  img {
    width: 100%;
    height: 750px; 
    object-fit: cover;
  }
`;

const CarouselFade = () => {
  return (
    <StyledCarousel fade>
      <Carousel.Item interval={2000}>
        <img  src={carousel} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img  src={carousel5} alt="Second slide" />
      </Carousel.Item>
    </StyledCarousel>
  );
};

export default CarouselFade;
