import { useContext } from "react";
import { SearchContext } from "../../context/searchContext";
import "./searchbar.css";

export default function Searchbar() {
  const { searchText, setSearchText } = useContext(SearchContext);
  return (
    <div className="searchbar">
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
        placeholder="Search by Name or Category"
      ></input>
    </div>
  );
}
