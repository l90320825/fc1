import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import MapContainer from "./components/MapContainer";
import ReactGa from "react-ga";

function App() {
  const [restaurant, setRestaurant] = useState([]);
  const [loadRestaurants, setLoadRestaurants] = useState([]);
  const [filterRestaurant, setFilterRestaurant] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("All");

  useEffect(() => {
    load();
    ReactGa.initialize('UA-196598528-1')
    ReactGa.pageview('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // without using the search button
  // useEffect(() => {
  //   setFilterRestaurant(
  //     loadRestaurants.filter((restaurants) =>
  //       restaurants.restaurant_name.toLowerCase().includes(search.toLowerCase())
  //     )
  //   );
  // }, [search, loadRestaurants]);

  // using the search button
  const setFilter = () => {
    if (searchType === "All") {
      setFilterRestaurant(
        loadRestaurants.filter((restaurants) =>
          restaurants.restaurant_name
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    } else {
      setFilterRestaurant(
        loadRestaurants.filter(
          (restaurants) =>
            restaurants.cuisine_type
              .toLowerCase()
              .includes(searchType.toLowerCase()) &&
            restaurants.restaurant_name
              .toLowerCase()
              .includes(search.toLowerCase())
        )
      );
    }
  };

  const load = async () => {
    const url = "/api/v1/restaurants/getAllRestaurants";
    await axios.get(url).then((response) => {
      console.log(response.data);
      const { restaurants } = response.data;
      setLoadRestaurants(restaurants);
    });
  };

  const handleSearches = async () => {
    const url = `/api/v1/search/items?search=${search.toLowerCase()}`;
    await axios
      .get(url)
      .then((response) => {
        setRestaurant(response.data);
        setFilter(response.data);
        toast.success(response.data.message);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelector = (event) => {
    // console.log(event.target.value)
    setSearchType(event.target.value);
  };

  const RestaurantDetail = (props) => {
    const { restaurant_name, restaurant_logo, address } = props;

    return (
      <div className='col-sm-6'>
        <div className='card mb-4 shadow-sm'>
          <MapContainer name={address} />
          <img
            src={restaurant_logo}
            className='card-img-top card-img'
            alt='logo'
          />
          <div className='card-body card-img'>
            <h5 className='card-title'>{restaurant_name}</h5>
            <p className='card-text'>{address}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <header>
        <nav className='navbar navbar-dark bg-dark'>
          <div className='container'>
            <h2 className=' navbar-brand'>VP</h2>
          </div>
        </nav>
      </header>
      <section className='jumbotron text-center bg-light'>
        <div className='container'>
          <Link to='/HP_Pages'>HP_Pages</Link>
          <h2 className='display-2'>Team5</h2>
          <h5 className='display-7'>CSC648 - Spring 2021</h5>
          <div className='row'>
            <div className='col mt-2'>
              <input
                className='form-control '
                type='text'
                placeholder='Search'
                aria-label='Search'
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className='col col-md-auto mt-2'>
              <button
                className='btn btn-outline-success '
                type='submit'
                onClick={handleSearches}
              >
                Search
              </button>
            </div>
            <select style={{ margin: "auto" }} onChange={handleSelector}>
              <optgroup label='Cuisine'>
                <option value='All'>All</option>
                <option value='American'>American</option>
                <option value='Italian'>Italian</option>
                <option value='Korean'>Korean</option>
                <option value='Chinese'>Chinese</option>
              </optgroup>
            </select>
          </div>
        </div>
      </section>
      <section className='py-5'>
        <div className='container'>
          <div className='row'>
            {filterRestaurant.map((restaurant, id) => (
              <RestaurantDetail key={id} {...restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* <MapContainer /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
