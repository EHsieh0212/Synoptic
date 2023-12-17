import Carousel from "react-bootstrap/Carousel";
import carousel from "../../Assests/carousel3.png";
import carousel5 from "../../Assests/carousel5.png";

const CarouselFade = () => {
  return (
    <Carousel fade>
      <Carousel.Item interval={8000}>
        <img className="d-block w-100 carousel-img" src={carousel} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item interval={8000}>
        <img className="d-block w-100 carousel-img" src={carousel5} alt="Second slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselFade;
