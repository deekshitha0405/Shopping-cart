const getFilteredData = (searchText, data) => {
  if (searchText)
    return data.filter((el) => {
      return (
        el.name.toLowerCase().includes(searchText.toLowerCase()) ||
        el.category.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  else {
    return data;
  }
};

const addItemToCart = (data, el) => {
  return data.map((obj) => {
    console.log(el, data);
    if (obj.key === el.key) {
      return { ...obj, cartCount: el.cartCount ? el.cartCount + 1 : 1 };
    }
    return obj;
  });
};

const removeItemFromCart = (data, el) => {
  return data.map((obj) => {
    if (obj.key === el.key) {
      return { ...obj, cartCount: el.cartCount - 1 };
    }
    return obj;
  });
};

const updateWishList = (data, el) => {
  return data.map((obj) => {
    if (obj.key === el.key) {
      return { ...obj, isWishlist: el.isWishlist ? !el.isWishlist : true };
    }
    return obj;
  });
};

const deleteProduct = (data, el) => {
  return data.filter((item) => item.key != el.key);
};

const updateProduct = (data, el) => {
  return data.map((obj) => {
    if (obj.key === el.key) {
      return { ...el };
    }
    return obj;
  });
};

const sortProducts = (array, filterValue) => {
  if (filterValue == "High Price") {
    return array.sort((a, b) => b.price - a.price);
  } else if (filterValue == "Low Price") {
    return array.sort((a, b) => a.price - b.price);
  } else if (filterValue == "Highest Rating") {
    return array.sort((a, b) => b.rating - a.rating);
  } else {
    return array;
  }
};
export {
  getFilteredData,
  addItemToCart,
  removeItemFromCart,
  deleteProduct,
  updateWishList,
  updateProduct,
  sortProducts
};
