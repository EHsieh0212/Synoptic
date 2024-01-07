import { useState } from "react";
import { StyledRightSide, Search, Cart, Member, Collection } from './rightsideStyle';
const RightSide = ({ search, cart, collection, signInLink, orderLink, collectionLink, handleSearchBox, cartNum }) => {
    return (
        <StyledRightSide>
            <Search onClick={handleSearchBox}>
                <img src={search} alt="search" />SEARCH
            </Search>
            <Member href={signInLink}>SIGN IN</Member>
            <Cart href={orderLink}>
                <img src={cart} alt="search" />
                {cartNum > 0? (<div className="cartLength">({cartNum})</div>) : ('')}
            </Cart>
            <Collection href={collectionLink}>
                <img src={collection} alt="collection" />
            </Collection>
        </StyledRightSide>

    )
}

export default RightSide;
