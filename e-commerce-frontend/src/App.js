import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import women_banner from "./Components/Assets/banner_women.png";
import men_banner from "./Components/Assets/banner_mens.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import LoginSignup from "./Pages/LoginSignup";
import Returns from "./Components/Returns/Returns";
import Contact from "./Components/Contact/Contact";
import Wishlist from "./Components/Wishlist/Wishlist";
import Checkout from "./Components/Checkout/Checkout";
import CCinfo from "./Components/CCinfo/CCinfo";



function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/new" element={<ShopCategory banner={men_banner} category="NEW" />} />
          <Route path="/shirts" element={<ShopCategory banner={women_banner} category="SHIRTS" />} />
          <Route path="/sweatpants" element={<ShopCategory banner={kid_banner} category="SWEATPANTS" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path="/ccinfo" element={<CCinfo />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup/>} />
          <Route path="/Contact" element={<Contact/>} />
          <Route path="/returnspage" element={<Returns/>} />
        </Routes>
        <Footer />
        
      </Router>
    </div>
  );
}

export default App;