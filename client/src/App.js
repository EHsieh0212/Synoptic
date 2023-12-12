import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider
} from "react-router-dom";
import React, { useState } from 'react';
import Header from "./Components/Header/Header";
import Focal from "./Pages/Focal/Focal";



const MainLayout = () => {
  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  return(
    <>
      <Header handleSearchBox={toggleSearch}/>
      <Outlet />
      {/* <Footer/> */}
    </>
  )
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Focal/>}/>
      {/* <Route path="product/:productIs" element={<Product />}/> */}
      {/* <Route path='*' element={<NotFound />}/> */}
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};


export default App;