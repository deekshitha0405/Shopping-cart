import { createContext, useState } from "react";

export const FilterValueContext = createContext({});

function FilterValueContextProvider({ children }) {
  const [filterValue, setFilterValue] = useState("");

  const updateFilterValue = (data) => {
    setFilterValue(data);
  };
  return (
    <FilterValueContext.Provider value={{ filterValue, updateFilterValue }}>
      {children}
    </FilterValueContext.Provider>
  );
}

export default FilterValueContextProvider;
