import { createContext, useState } from "react";

export const CartContext = createContext({});

function CartCountContextProvider({ children }) {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    let count = 0;
    const data = JSON.parse(localStorage.getItem("products"));
    data?.map((el) => (count = el.cartCount + count));
    setCount(count);
  };
  return (
    <CartContext.Provider value={{ count, updateCount }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartCountContextProvider;
