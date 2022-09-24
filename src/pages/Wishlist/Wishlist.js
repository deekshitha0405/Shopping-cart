import Card from "../../components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartCountContext";
import { SearchContext } from "../../context/searchContext";
import {
  addItemToCart,
  getFilteredData,
  removeItemFromCart,
  updateWishList,
  sortProducts
} from "../../helper/resusableFunctions";
import { FilterValueContext } from "../../context/productFilterContext";

export default function WishList() {
  const { updateCount } = useContext(CartContext);
  const { searchText } = useContext(SearchContext);
  const [data, setData] = useState([]);
  const { filterValue } = useContext(FilterValueContext);
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("products"));
    filterWishList(localData);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("products", JSON.stringify(data));
    }
    updateCount();
  }, [data]);

  const filterWishList = (array) => {
    let filteredArray = array?.filter((el) => el.isWishlist == true);
    if (filteredArray.length == 0) {
      localStorage.setItem("products", JSON.stringify(array));
    }
    setData(filteredArray);
  };

  useEffect(() => {
    getFilteredData(searchText, data);
  }, [searchText]);

  useEffect(() => {
    sortProducts(getFilteredData(searchText, data));
  }, [filterValue]);

  const addOrRemovefromWishList = (el) => {
    filterWishList(updateWishList(data, el));
  };

  const addOrRemovefromCart = (el, type) => {
    if (type == "add") setData(addItemToCart(data, el));
    else if (type == "remove") setData(removeItemFromCart(data, el));
  };

  return (
    <div>
      <div className="product-container">
        {getFilteredData(searchText, data)?.length > 0 ? (
          sortProducts(
            getFilteredData(searchText, data),
            filterValue
          )?.map((el, index) => (
            <Card
              key={index}
              item={el}
              addOrRemoveFromList={addOrRemovefromWishList}
              addOrRemovefromCart={addOrRemovefromCart}
            />
          ))
        ) : (
          <div>No Product to display</div>
        )}
      </div>
    </div>
  );
}
