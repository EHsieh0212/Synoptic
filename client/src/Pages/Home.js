import { Routes, Route } from "react-router-dom";

// import components
import CarouselFade from "../Components/Carousel/Carousel";
import ProductList from "../Components/ProductList/ProductList";

import React from 'react'


const Home = () => {

  return (
    <>
      <CarouselFade />
      {/* <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes> */}
    </>
  );
};

export default Home;
