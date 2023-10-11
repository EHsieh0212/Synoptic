import Carousel from "react-bootstrap/Carousel";
import carousel from "../../Assests/carousel.png";

const CarouselFade = () => {
  return (
    <Carousel fade>
      <Carousel.Item interval={3000}>
        <img className="d-block w-100" src={carousel} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img className="d-block w-100" src={carousel} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img className="d-block w-100" src={carousel} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselFade;

// 寫兩種break point處理
