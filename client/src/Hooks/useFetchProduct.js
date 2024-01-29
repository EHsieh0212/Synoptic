import { useState, useEffect, useCallback } from 'react';
import useUrl from './useUrl';
import { parseColors, parseStock } from "../Utils/product";

const useFetchProduct = (paging) => {
    const [products, setProducts] = useState([]); // 1. stat;
    const [dataCount, setDataCount] = useState(0);// 2. state
    const [loading, setLoading] = useState(true); 
    const url = useUrl(paging);

    const getPds = useCallback(async () => {
        // (1) try-catch (2) await fetch -> check res.ok? -> (3) res.json store in product useState
        try{
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Network response was not ok.');
              }
            const result = await res.json();
            setProducts(arr => arr.concat(
                result.data.map(pd => {
                    return {
                        id: pd.id, 
                        imgSrc: pd.imgSrc,
                        title: pd.title,
                        price: pd.price,
                        colors: parseColors(pd.stock),
                        sizes: parseStock(pd.stock),
                        description: pd.description,
                        more: pd.more,
                        stock: pd.stock
                    }
                })));
            setDataCount(result.dataCount);
            setLoading(false);
        } catch(error){
            console.log(error);
        }
    }, [url]);

    // url changes -> new getPds() -> getPds changes -> new products
    useEffect(() => {
        getPds();
    }, [getPds])

    return { products, dataCount, loading };
};

export default useFetchProduct;
