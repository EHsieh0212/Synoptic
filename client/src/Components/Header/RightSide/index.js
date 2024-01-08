import { StyledRightSide, Search, Cart, Member, Collection } from './rightsideStyle';
const RightSide = ({ search, cart, collection, signInLink, collectionLink, handleSearchBox, cartNum }) => {
    return (
        <StyledRightSide>
            <Search onClick={handleSearchBox}>
                <img src={search} alt="search" />SEARCH
            </Search>
            <Member href={signInLink}>SIGN IN</Member>
            <Cart >
                <img src={cart} alt="search" />
                {cartNum > 0? (<a className="cartLength" href="/checkout">({cartNum})</a>) : ('')}
            </Cart>
            <Collection href={collectionLink}>
                <img src={collection} alt="collection" />
            </Collection>
        </StyledRightSide>

    )
}

export default RightSide;
