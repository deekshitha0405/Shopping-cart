import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartCountContextProvider from "./context/cartCountContext";
import SearchContextProvider from "./context/searchContext";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import { PopupProvider } from "react-custom-popup";
import FilterValueContextProvider from "./context/productFilterContext";

export default function App() {
  return (
    <BrowserRouter>
      <PopupProvider>
        <SearchContextProvider>
          <FilterValueContextProvider>
            <CartCountContextProvider>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Routes>
            </CartCountContextProvider>
          </FilterValueContextProvider>
        </SearchContextProvider>
      </PopupProvider>
    </BrowserRouter>
  );
}
