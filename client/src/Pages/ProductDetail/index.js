import { filter } from "lodash";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import useFetchProduct from "../../Hooks/useFetchProduct";
import {
    BigContainer, StyledImage, StyledRight,
    RightUp, StyledTitle, StyledPrice, RightMiddle, MiddleText, SizeBlock, SizeBlockContainer,
    DescriptionText, AddToBag, StyledToaster
} from "./productDetailStyle";
import SelectMenu from "./SelectMenu";
import { getColorNameByCode, DEFAULTSIZES, CART_API_URL } from "../../Utils/product";
import { catchErrors, PUT_REQUEST_OPTIONS } from "../../Utils";
import Loader from "../../Components/Loader";


const ProductDetail = () => {
    const { products, loading } = useFetchProduct(0);
    // parse products (Q: find a way to set loader + directly parse product)
    const [id, setId] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState([]);

    // customer selections
    const [selectedColor, setSelectedColor] = useState('');
    const [availableSizes, setAvailableSizes] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [stockMaxQuantity, setStockMaxQuantity] = useState(0);
    const [canAdd, setCanAdd] = useState(1);

    useEffect(() => {
        if (products && products.length > 0) {
            const { id, imgSrc, title, price, stock } = products[0];
            setId(id);
            setImgSrc(imgSrc);
            setTitle(title);
            setPrice(price);
            setStock(stock);
        }
    }, [products]);

    let options = [];
    if (products && products.length > 0) {
        options = products[0].colors.map(color => ({ value: color, label: getColorNameByCode(color), color: color }));
    }

    const pickColor = (selectedColor) => {
        setSelectedColor(selectedColor.color);
    };
    const pickSize = (event) => {
        const { value } = event.target;
        // 1. set size
        setSelectedSize(value);

        // 2. set stock max quantity
        const theStockObj = filter(stock, (obj) => {
            return obj.color === selectedColor && obj.size === value; // this returns a arr with 1 obj
        })
        setStockMaxQuantity(theStockObj[0].quantity - 1);
    };

    useEffect(() => {
        if (selectedColor && products && products.length > 0) {
            setAvailableSizes(Object.keys(products[0].sizes[selectedColor]))
        }
    }, [selectedColor, products]);

    const pressAddToBag = catchErrors(async () => {
        // 1. check addable or not
        const canAddToBag = selectedColor && selectedSize;
        if (!canAddToBag) {
            setCanAdd(canAddToBag);
            setTimeout(() => {
                setCanAdd(true);
            }, 1500);
            return;
        }

        // 2. change cart items: incrementBy is fixed to 1
        const cartItem = {
            productId: id,
            imgSrc,
            title,
            price,
            color: selectedColor,
            size: selectedSize,
            incrementBy: 1,
            stockMaxQuantity
        };
        console.log('-----------------')
        console.log('put the cart item into Redis')
        console.log(cartItem)
        // 3. put the cart item into Redis
        const requestOptions = PUT_REQUEST_OPTIONS(JSON.stringify(cartItem));
        const response = await fetch(CART_API_URL, requestOptions);
        if (!response.ok) {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.message || `Request failed with status ${response.status}`;
            toast.error(errorMessage);
            throw new Error(errorMessage);
        } else {
            const cartLength = await response.json();
            localStorage.setItem("cartLength", cartLength.cartLength);
            window.dispatchEvent(new Event("storage"));
            toast.success('Add item to cart!');
        }
    });

    return (
        <div>
            {loading ? (<Loader />) :
                (
                    (products && products.length > 0) ?
                        (<BigContainer>
                            <StyledImage>
                                <img src={imgSrc} alt={imgSrc} />
                            </StyledImage>
                            <StyledRight>
                                <RightUp>
                                    <StyledTitle>{title}</StyledTitle>
                                    <StyledPrice>${price} TWD</StyledPrice>
                                </RightUp>
                                <RightMiddle>
                                    <MiddleText>color</MiddleText>
                                    <SelectMenu coloroptions={options} pickColor={pickColor} />
                                </RightMiddle>
                                <RightMiddle>
                                    <MiddleText>size</MiddleText>
                                    <SizeBlockContainer>
                                        {availableSizes ? availableSizes.map(size => (<SizeBlock key={size} value={size} onClick={pickSize} isPicked={selectedSize === size}>{size}</SizeBlock>)) : DEFAULTSIZES.map(size => (<SizeBlock>{size}</SizeBlock>))}
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
                                    <StyledToaster />
                                    <AddToBag onClick={pressAddToBag}>
                                        {canAdd ? 'Add To Bag' : 'Please Add'}
                                    </AddToBag>
                                </RightMiddle>
                            </StyledRight>
                        </BigContainer>
                        ) : (
                            <div>sorry no product details</div>
                        )
                )}
        </div>
    );
};

export default ProductDetail;
