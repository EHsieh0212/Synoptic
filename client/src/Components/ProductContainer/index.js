import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchProduct from "../../Hooks/useFetchProduct";

const StyledProductContainer = styled.div`
    padding-bottom: 50px;
`;

const More = styled.button`
    padding: 30px;
    :hover{
        background-color: red;
    }
`;

const ProductContainer = () => {
    const { category } = useParams();
    const [paging, setPaging] = useState(0);
    //***notice:  setPaging is an action, but handleMoreClick is a function. onClick needs a "function" input.
    const handleMoreClick = () => {
        setPaging(prevPaging => prevPaging + 1);
      };
    useEffect(() => {
        return () => {
            setPaging(0);
        }
    }, [category]);
    
    const { products, loading } = useFetchProduct(paging);
    return (
        <div>
            {!loading && products.error ?
                <div>sorry, product not found</div> :
                <div>
                    <StyledProductContainer>
                        hihihi {category} <br />
                        hihihi {JSON.stringify(products)}
                    </StyledProductContainer>
                    <More onClick={handleMoreClick}>More {paging}</More>
                </div>
            }
        </div>
    )
};

export default ProductContainer;
