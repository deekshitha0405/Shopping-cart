import { useContext } from "react";
import Searchbar from "../Searchbar/Searchbar";
import "./Header.css";
import { CartContext } from "../../context/cartCountContext";
import { useNavigate } from "react-router-dom";
import { filterBy } from "../../helper/constant";
import { FilterValueContext } from "../../context/productFilterContext";

export default function Header() {
  const { count } = useContext(CartContext);
  const { updateFilterValue } = useContext(FilterValueContext);

  const navigate = useNavigate();
  return (
    <div className="header">
      <Searchbar />
      <div className="menu-items">
        <div className="pr pl">
          <select
            defaultValue=""
            className="select"
            onChange={(e) => updateFilterValue(e.target.value)}
          >
            <option value="" disabled>
              Filter By
            </option>
            {filterBy.map((el) => (
              <option value={el.value} key={el.id}>
                {el.value}
              </option>
            ))}
          </select>
        </div>
        <div className="pr pl icons" onClick={() => navigate("/")}>
          {" "}
          <img src="./assets/home.png" alt="plusbtn" />
        </div>
        <div className="pr pl " onClick={() => navigate("/wishlist")}>
          Wishlist
        </div>
        <div className="pl icons" onClick={() => navigate("/cart")}>
          <img src="./assets/shopping-cart.png" alt="plusbtn" />
        </div>
        {count > 0 && <div className="cart-count">{count}</div>}
      </div>
    </div>
  );
}
