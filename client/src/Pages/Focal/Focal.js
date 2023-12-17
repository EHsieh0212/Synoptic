import CarouselFade from "../../Components/Carousel";
import styled from "styled-components";

const StyledFocal = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Focal = () => {
  return (
    <StyledFocal>
      <CarouselFade />
      {/* <ProductShowcase /> */}
    </StyledFocal>


  );
};

export default Focal;
