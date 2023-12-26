import { useState, useEffect, useCallback } from 'react';
import useUrl from './useUrl';
import { parseColors } from "../Utils/product";

const useFetchProduct = (paging) => {
    const [loading, setLoading] = useState(true); // 2. state
    const [products, setProducts] = useState([]); // 1. stat;
    const [dataCount, setDataCount] = useState(0);
    const url = useUrl(paging);

    const getPds = useCallback(async () => {
        const res = await fetch(url);
        const result = await res.json();
        setProducts(arr => arr.concat(
            result.data.map(pd => {
                return {
                    id: pd.id, 
                    imgSrc: pd.imgSrc,
                    title: pd.title,
                    price: pd.price,
                    colors: parseColors(pd.stock)
                }
            })));
        setDataCount(result.dataCount);
        setLoading(false);
    }, [url]);

    // url changes -> new getPds() -> getPds changes -> new products
    useEffect(() => {
        getPds();
    }, [getPds])

    return { products, loading, dataCount };
};

export default useFetchProduct;
