import { useState, useEffect, useCallback } from 'react';
import useUrl from './useUrl';

const useFetchProduct = (paging) => {
    const [loading, setLoading] = useState(true); // 2. state
    const [products, setProducts] = useState([]); // 1. state
    const url = useUrl(paging);

    const getPds = useCallback(async () => {
        const res = await fetch(url);
        const result = await res.json();
        setProducts(arr => arr.concat(result.data));
        setLoading(false);
    }, [url]);

    // url changes -> new getPds() -> getPds changes -> new products
    useEffect(() => {
        getPds();
    }, [getPds])

    return { products, loading };
};

export default useFetchProduct;
