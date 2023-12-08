// global imports
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
// components import
import Header from "./GlobalComponents/Header/Header";
import Footer from "./GlobalComponents/Footer/Footer";
import Home from "./Pages/Home/Home";

///////////////////////////////////////////////////////////////////////
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};


export default App;