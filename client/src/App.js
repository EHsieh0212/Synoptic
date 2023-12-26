import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import Focal from "./Pages/Focal";
import MainLayout from "./Pages/MainLayout";
import ProductContainer from "./Components/ProductContainer";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Focal />} />
      <Route path="/category/:category" element={<ProductContainer />}/>
      {/* <Route path="product/:productIs" element={<Product />}/> */}
      {/* <Route path='*' element={<NotFound />}/> */}
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