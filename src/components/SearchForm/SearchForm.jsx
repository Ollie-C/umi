import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchForm.scss";

const SearchForm = ({ handleSearchSubmit }) => {
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  const mockCategories = ["Cafe", "Restaurant", "Groceries", "Retails"];

  const changeHandler = (e) => {
    setAddress(e.target.value);
  };
  return (
    <form id="searchForm" className="searchForm">
      <div className="searchForm__fields">
        <input
          type="text"
          className="searchForm__input"
          placeholder="Search local ..."
          name="search"
          onChange={changeHandler}
        ></input>
        <select name="category" className="searchForm__select">
          {mockCategories.map((category, index) => (
            <option key={index} value={category}>
              {category.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        form="searchForm"
        className="searchForm__button"
        onClick={(e) => {
          e.preventDefault();
          handleSearchSubmit(address);
          navigate(`search/${address}`);
        }}
      >
        GO
      </button>
    </form>
  );
};

export default SearchForm;
