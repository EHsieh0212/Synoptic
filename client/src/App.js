// global imports
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// components import
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";

///////////////////////////////////////////////////////////////////////
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};


export default App;