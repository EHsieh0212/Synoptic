import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchProduct from "../../Hooks/useFetchProduct";
import {
    StyledProductContainer, StyledMore, More, StyledProduct, StyledImage, Image,
    StyledTitle, StyledPrice, StyledColorContainer, ColorBlock
} from "./productcontainerStyle";
import Loader from '../Loader';

const Product = ({ id, imgSrc, colors, title, price }) => {
    return (
        <StyledProduct>
            <StyledImage href={`/product/${id}`}>
                <Image src={imgSrc} />
            </StyledImage>
            <StyledTitle href={`/product/${id}`}>
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
    const { products, dataCount } = useFetchProduct(paging);
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
            {(typeof products === 'undefined' || products.length === 0) ?
                (<Loader />) :
                (<div>
                    <StyledProductContainer>
                        {products.map(product => (
                            <div>
                                <Product
                                    id={product.id}
                                    key={product.id.toString()}
                                    imgSrc={product.imgSrc}
                                    title={product.title}
                                    price={product.price}
                                    colors={product.colors} />
                            </div>
                        ))}
                    </StyledProductContainer>
                    <StyledMore>
                        <More onClick={handleMoreClick} canMore={dataCount}>MORE</More>
                    </StyledMore>
                </div>)
            }
        </div >
    )
};

export default ProductContainer;
