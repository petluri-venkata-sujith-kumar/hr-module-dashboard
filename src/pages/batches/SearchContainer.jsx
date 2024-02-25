/* eslint-disable react/prop-types */
import { IoIosSearch } from "react-icons/io";
import Filter from "./Filter";
import "./searchContainer.css";
import { useContext } from "react";
import { BatchContextApi } from "../../context/BatchContext";

const SearchContainer = () => {
  const { handleSearch } = useContext(BatchContextApi);

  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <section className="search-batch-container">
      <article className="searchbar">
        <div className="filter">
          <Filter />
        </div>
        <div className="search-batch">
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Search Batches..."
          />
        </div>
        <div className="search-icon">
          <IoIosSearch />
        </div>
      </article>
    </section>
  );
};

export default SearchContainer;
