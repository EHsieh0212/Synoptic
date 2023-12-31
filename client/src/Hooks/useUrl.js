import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
const PRODUCTS_API_URL = `${process.env.REACT_APP_WEBSITE_URL}/api/v1/products`;

const useUrl = (paging) => {
    const { category, keyword, productId } = useParams();
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const path = window.location.pathname;
        const pathSegments = path.split('/').filter(segment => segment !== '');

        if (pathSegments[0] === 'category') {
            setUrl(`${PRODUCTS_API_URL}/${category}?paging=${paging}`);
        } else if (pathSegments[0] === 'search'){
            setUrl(`${PRODUCTS_API_URL}/search/${keyword}?paging=${paging}`);
        } else {
            setUrl(`${PRODUCTS_API_URL}/details?id=${productId}`);
        }
    }, [paging, category, keyword, productId, url]);
    return url;
};

export default useUrl;
