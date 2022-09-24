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

export default function Cart() {
  const { count, updateCount } = useContext(CartContext);
  const { searchText } = useContext(SearchContext);
  const [data, setData] = useState([]);
  const { filterValue } = useContext(FilterValueContext);

  useEffect(() => {
    sortProducts(getFilteredData(searchText, data));
  }, [filterValue]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("products"));
    filterCart(localData);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("products", JSON.stringify(data));
    }
    updateCount();
  }, [data]);

  const filterCart = (array) => {
    setData(array?.filter((el) => el.cartCount > 0));
  };

  useEffect(() => {
    if (count == 0) filterCart(data);
  }, [count]);

  useEffect(() => {
    getFilteredData(searchText, data);
  }, [searchText]);

  const addOrRemovefromWishList = (el) => {
    setData(updateWishList(data, el));
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
