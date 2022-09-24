import Button from "../../components/Button/Button";
import { category, product } from "../../helper/constant";
import Card from "../../components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartCountContext";
import { SearchContext } from "../../context/searchContext";
import {
  addItemToCart,
  deleteProduct,
  getFilteredData,
  removeItemFromCart,
  updateProduct,
  updateWishList,
  sortProducts
} from "../../helper/resusableFunctions";
import { AnimationType, OutAnimationType, usePopup } from "react-custom-popup";
import Form from "../../components/Form/Form";
import { FilterValueContext } from "../../context/productFilterContext";

export default function Home() {
  const { updateCount } = useContext(CartContext);
  const { searchText } = useContext(SearchContext);
  const [data, setData] = useState();
  const [formDefaultValues, setDefaultValues] = useState({});
  const { showModal } = usePopup();
  const { filterValue } = useContext(FilterValueContext);

  useEffect(() => {
    let item = localStorage.getItem("products");
    if (item?.length > 0) {
      setData(JSON.parse(item));
    } else {
      localStorage.setItem("products", JSON.stringify(product));
      setData(product);
    }
  }, []);

  useEffect(() => {
    sortProducts(getFilteredData(searchText, data));
  }, [filterValue]);

  useEffect(() => {
    if (data) {
      if (data.length > 0)
        localStorage.setItem("products", JSON.stringify(data));
      else localStorage.setItem("products", JSON.stringify(data));
    }
    updateCount();
  }, [data]);

  useEffect(() => {
    getFilteredData(searchText, data);
  }, [searchText]);

  useEffect(() => {
    if (formDefaultValues.name)
      showModal(<Form fields={formField} onSubmit={editProduct} />, {
        animationType: AnimationType.SLIDE_IN_UP,
        outAnimationType: OutAnimationType.SLIDE_OUT_UP
      });
  }, [formDefaultValues]);

  const addOrRemovefromWishList = (el) => {
    setData(updateWishList(data, el));
  };

  const addOrRemovefromCart = (el, type) => {
    if (type == "add") setData(addItemToCart(data, el));
    else if (type == "remove") setData(removeItemFromCart(data, el));
  };

  const removeProduct = (el) => {
    setData(deleteProduct(data, el));
  };

  const showProductPopup = () => {
    showModal(<Form fields={formField} onSubmit={addProduct} />, {
      animationType: AnimationType.SLIDE_IN_UP,
      outAnimationType: OutAnimationType.SLIDE_OUT_UP
    });
  };

  const addProduct = (item) => {
    let updatedData = { key: Math.floor(Math.random() * 100), ...item };
    setData([...data, updatedData]);
  };

  const editProduct = (item) => {
    let updatedData = { key: formDefaultValues.key, ...item };
    setData(updateProduct(data, updatedData));
    setDefaultValues({});
  };

  const formField = [
    {
      label: "Product Name",
      name: "name",
      placeHolder: "Please enter product name",
      type: "text",
      defaultValue: formDefaultValues?.name
    },
    {
      label: "Product Image",
      name: "image",
      placeHolder: "Please enter image url",
      type: "text",
      defaultValue: formDefaultValues?.image
    },
    {
      label: "Description",
      name: "description",
      placeHolder: "Please enter product description",
      type: "textarea",
      defaultValue: formDefaultValues?.description
    },
    {
      label: "Price",
      name: "price",
      placeHolder: "Please enter price for the product",
      type: "number",
      defaultValue: formDefaultValues?.price
    },
    {
      label: "Category",
      name: "category",
      type: "select",
      data: category,
      defaultValue: formDefaultValues?.category
    },
    {
      label: "Rating",
      name: "rating",
      placeHolder: "Please enter ratings for the product",
      type: "number",
      defaultValue: formDefaultValues?.rating
    }
  ];
  return (
    <div>
      <div className="button-container">
        <Button btnName="Add Product" onClick={() => showProductPopup()} />
      </div>
      <div className="product-container">
        {getFilteredData(searchText, data)?.length > 0 ? (
          sortProducts(
            getFilteredData(searchText, data),
            filterValue
          )?.map((el, index) => (
            <Card
              from="home"
              key={index}
              item={el}
              addOrRemoveFromList={addOrRemovefromWishList}
              addOrRemovefromCart={addOrRemovefromCart}
              removeProduct={removeProduct}
              editProduct={(item) => setDefaultValues({ ...item })}
            />
          ))
        ) : (
          <div>No Product to display</div>
        )}
      </div>
      {/* <Form fields={formField} /> */}
    </div>
  );
}
