import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SearchPage from "./SearchPage";

function SearchMenu(props) {
  const [searchItem, setSearchItem] = useState([]);

  const [message, setShowMessage] = useState("");
  const searchTerm = useSelector((state) => state.searchReducer.searchTerm);
  useEffect(() => {
    retrieveMenu(searchTerm);
  }, [searchTerm]);

  const retrieveMenu = async (item) => {
    const url = `/api/v1/search/items?search=${item}`;
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setSearchItem(response.data.results);
        setShowMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <div className='row'>
        
        <h6 className='py-2 my-3'>{message}</h6>
        {searchItem.map((restaurant, id) => (
          <div className='col-sm-6'>
          <SearchPage key={id} {...restaurant}></SearchPage>
          </div>
        ))}
        </div>
      
    </div>
  );
}
export default SearchMenu;
