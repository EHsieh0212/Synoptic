import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
const PRODUCTS_API_URL = `${process.env.REACT_APP_WEBSITE_URL}/api/v1/products`;

const useUrl = (paging) => {
    const { category } = useParams();
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const path = window.location.pathname;
        const pathSegments = path.split('/').filter(segment => segment !== '');

        if (pathSegments[0] === 'category') {
            setUrl(`${PRODUCTS_API_URL}/${category}?paging=${paging}`);
        } else {
            const keyword = pathSegments[0].split('?keyword=')[1];
            setUrl(`${PRODUCTS_API_URL}/search?keyword=${keyword}`);
        }
        console.log(url)
    }, [paging, category, url]);
    return url;
};

export default useUrl;
