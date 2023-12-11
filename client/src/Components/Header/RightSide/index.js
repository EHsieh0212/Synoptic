import { StyledRightSide, Search, Cart, Member, Collection } from './rightsideStyle'

const RightSide = ({ search, cart, collection, signInLink, orderLink, collectionLink }) => {
    return (
        <StyledRightSide>
            <Search>
                <img src={search} alt="search" />SEARCH
            </Search>
            <Member href={signInLink}>SIGN IN</Member>
            <Cart href={orderLink}>
                <img src={cart} alt="search" />
            </Cart>
            <Collection href={collectionLink}>
                <img src={collection} alt="collection" />
            </Collection>
        </StyledRightSide>
    )
}

export default RightSide;
