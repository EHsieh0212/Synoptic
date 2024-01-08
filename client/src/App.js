import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import Focal from "./Pages/Focal";
import MainLayout from "./Pages/MainLayout";
import ProductContainer from "./Components/ProductContainer";
import ProductDetail from "./Pages/ProductDetail";
import Checkout from "./Pages/Checkout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Focal />} />
      <Route path="/category/:category" element={<ProductContainer />}/>
      <Route path="/search/:keyword" element={<ProductContainer />}/>
      <Route path="/product/:productId" element={<ProductDetail />}/>
      <Route path='/checkout' element={<Checkout />}/>
      {/* <Route path='/member' element={<Member />}/>  */}
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};


export default App;