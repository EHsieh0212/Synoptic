import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Product from './Product';
import Error from '../../Pages/Error/Error';
import axios from 'axios';

//////////////////////////////////////////////////////////////////////////////////////
// downstream:  state-effect pass in prop to upstream component

const ProductList = () => {
  ///////////////////////////////////////
  // (A) useState
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('all');
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const location = useLocation();

  ///////////////////////////////////////
  // (B) useEffect
  // note: ProductList section will be rendered by 2 action types: (1)select category -> fecth category api data
  //                                                               (2)search keyword -> fetch search api data
  useEffect(() => {
    const get = async () => {
      try{
        // default: get all data
        if (!location.search){
          const allProducts = await getAccordingProductData('all');
          setError("")
          setProducts(allProducts);
        }

        // if there is query string: modify productList component and re-render
        const targetCategory = searchParams.get('categories');
        const targetSearchKeyword = searchParams.get('search');

        if (targetCategory){
          const catProducts = await getAccordingProductData(targetCategory);
          if (catProducts){
            setError("")
            setProducts(catProducts);
          } else{
            setError("no category data found.")
          }
        } 
        else if(targetSearchKeyword){
          const searchProducts = await getSearchProductData(targetSearchKeyword);
          if (searchProducts){
            setError("")
            setProducts(searchProducts)}
          else{
            setError("no search products found.")
          }}
      } catch(error){
        console.log(error)
      } 
    }
    get();
  }, [searchParams])


  ///////////////////////////////////////
  // (C) local prop func to perform
  const getAccordingProductData = async (category) => {
    try {
      const productsOfCategory = await axios.get(`http://localhost:4000/api/v1/products/${category}/?paging=0`);
      return productsOfCategory.data.results;  // return only results
    }
    catch (error) {
      console.log(error)
    }
  };

  const getSearchProductData = async (keyword) => {
    try {
      const productsOfCategory = await axios.get(`http://localhost:4000/api/v1/products/search/?keyword=${keyword}`);
      return productsOfCategory.data.results;  // return only results
    }
    catch (error) {
      console.log(error)
    }
  };

  ///////////////////////////////////////
  // (D) JSX
  return (
    <div className="container my-5 d-flex flex-wrap">
      <div className="row justify-content-start mx-auto" id="insert-products">
        {error ? (<Error msg={error}/>)
        :(
          Object.keys(products)?.map((key) => (
            <Product
              key={key}
              img={`http://localhost:4000${products[key].product_img}`}
              name={products[key].product_name}
              colors={products[key].product_colors}
              price={products[key].product_price}
            />
          ))
        )}
      </div>
    </div>
  );
};


export default ProductList;


// Question: can we use return cleanup about error status?
