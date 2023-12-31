import { useState, useEffect } from "react";
import useFetchProduct from "../../Hooks/useFetchProduct";
import {
  BigContainer, StyledImage, Image, StyledRight,
  RightUp, StyledTitle, StyledPrice, RightMiddle, MiddleText, SizeBlock, SizeBlockContainer,
  DescriptionText, AddToBag
} from "./productDetailStyle";
import SelectMenu from "./selectMenu";
import { getColorNameByCode } from "../../Utils/product";
const DEFAULTSIZES = ["XS", "S", "M", "L", "XL"];

const ProductDetails = () => {
  const { products, loading, dataCount } = useFetchProduct(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [availableSizes, setAvailableSizes] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [canAdd, setCanAdd] = useState(1);

  let options = [];
  if (products && products.length > 0) {
    options = products[0].colors.map(color => ({ value: color, label: getColorNameByCode(color), color: color }));
  }

  const pickColor = (selectedColor) => {
    setSelectedColor(selectedColor.color);
  };
  const pickSize = (event) => {
    const { value } = event.target;
    setSelectedSize(value)
  };

  useEffect(() => {
    if (selectedColor && products && products.length > 0) {
      setAvailableSizes(Object.keys(products[0].sizes[selectedColor]))
    }
  }, [selectedColor, products])

  const pressAddToBag = () => {
    const canAddToBag = selectedColor && selectedSize;
    setCanAdd(canAddToBag);
    setTimeout(() => {
      setCanAdd(true);
    }, 1500);
  };

  return (
    <div>
      {(typeof products === 'undefined' || products.length === 0) ?
        <div>sorry, no product details</div> :
        <BigContainer>
          <StyledImage>
            <Image src={products[0].imgSrc} />
          </StyledImage>
          <StyledRight>
            <RightUp>
              <StyledTitle>{products[0].title}</StyledTitle>
              <StyledPrice>${products[0].price} TWD</StyledPrice>
            </RightUp>
            <RightMiddle>
              <MiddleText>color</MiddleText>
              <SelectMenu coloroptions={options} pickColor={pickColor} />
            </RightMiddle>
            <RightMiddle>
              <MiddleText>size</MiddleText>
              <SizeBlockContainer>
                {availableSizes ? availableSizes.map(size => (<SizeBlock value={size} onClick={pickSize} isPicked={selectedSize===size}>{size}</SizeBlock>)) : DEFAULTSIZES.map(size => (<SizeBlock>{size}</SizeBlock>))}
              </SizeBlockContainer>
            </RightMiddle>
            <RightMiddle>
              <MiddleText>description</MiddleText>
              <DescriptionText>{products[0].description}</DescriptionText>
            </RightMiddle>
            <RightMiddle>
              <MiddleText>more</MiddleText>
              <DescriptionText>{products[0].more}</DescriptionText>
            </RightMiddle>
            <RightMiddle>
              <AddToBag onClick={pressAddToBag}>
              {canAdd ? 'Add To Bag' : 'Please Add'}
              </AddToBag>
            </RightMiddle>
          </StyledRight>
        </BigContainer>
      }
    </div>
  )
};

export default ProductDetails;
