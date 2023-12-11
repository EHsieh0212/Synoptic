// global imports
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
// components import
import Header from "./Components/Header/Header";
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
    </BrowserRouter>
  );
};


export default App;