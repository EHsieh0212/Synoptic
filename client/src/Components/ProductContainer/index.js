import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchProduct from "../../Hooks/useFetchProduct";

const StyledProductContainer = styled.div`
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 10px;
    width: 100%;
    margin: 0 auto;
    max-width: 1700px;
    /* align-items: center; */
    /* @media (max-width: 1300px) { /* 在螢幕寬度小於768px時，改變容器大小 */
        /* width: 80%; */
     /* */

`;
const StyledMore = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
`;
const More = styled.button`
    border: 1px solid #B8B8B8;
    padding-left: 15px;
    padding-right: 15px;
    :hover{
        background-color: ${props => props.canMore < 6 ? 'none' : 'red'};
        cursor: ${props => props.canMore < 6 ? 'default' : 'pointer'};;
    }
    font-weight: 500;
`;

const StyledProduct = styled.div`
    display: flex;
    flex-direction: column;
    width: 470px;
    /* @media (max-width: 768px) { 
        width: 50%;
    } */
    padding: 0px;
`;

const StyledImage = styled.a`
  display: block; /** */
  text-align: center; /** */
  padding:0;
  margin: 0;
`;
const Image = styled.img`
  width: 100%;
  height: 680px; 
`;
const StyledTitle = styled.a`
  padding:0;
  margin: 0;
  color: black;
  text-decoration: none; /* Link will eventually renders into a, so this assignment is working. */
    :hover{
      cursor: pointer;
      color: grey;
    }
    font-size: 15px;
`;
const StyledPrice = styled.div`
  padding:0;
  margin: 0;
  font-size: 12px;
`;
const StyledColorContainer = styled.div`
    display: flex;
`;
const ColorBlock = styled.div`
    background-color: ${props => props.color};
    padding: 0; 
    height: 10px; 
    width: 10px; 
    border: 1px solid #000;
    /* gap: 12px; */
`;


const Product = ({ imgSrc, colors, title, price }) => {
    return (
        <StyledProduct>
            <StyledImage href="/">
                <Image src={imgSrc} />
            </StyledImage>
            <StyledTitle href="/">
                {title}
            </StyledTitle>
            <StyledPrice>
                ${price} TWD
            </StyledPrice>
            <StyledColorContainer>
                {colors.map(color => (<ColorBlock key={color} color={color} />))}
            </StyledColorContainer>
        </StyledProduct>
    );
};

const ProductContainer = () => {
    const { category } = useParams();
    const [paging, setPaging] = useState(0);
    const { products, loading, dataCount } = useFetchProduct(paging);
    //***notice:  setPaging is an action, but handleMoreClick is a function. onClick needs a "function" input.
    const handleMoreClick = () => {
        if (dataCount >= 6) {
            setPaging(prevPaging => prevPaging + 1);
        }
    };
    //whenever changes category, clears paging
    useEffect(() => {
        return () => {
            setPaging(0);
        }
    }, [category]);


    return (
        <div>
            {(!products || products.length === 0) ?
                <div>sorry, product not found</div> :
                <StyledProductContainer>
                    {products.map(product => (
                        <div>
                            <Product
                                key={product.id.toString()}
                                imgSrc={product.imgSrc}
                                title={product.title}
                                price={product.price}
                                colors={product.colors} />
                        </div>
                    ))}
                </StyledProductContainer>
            }
            <StyledMore>
                <More onClick={handleMoreClick} canMore={dataCount}>MORE</More>
            </StyledMore>
        </div>
    )
};

export default ProductContainer;
