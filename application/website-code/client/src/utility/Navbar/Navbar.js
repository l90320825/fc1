import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../redux/actions/searchActions";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

library.add(faSearch, faCartPlus);

function Navbar({ isLoggedIn }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [loadCuisineType, setLoadCuisineType] = useState([]);
  const history = useHistory();
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllRestaurants();
  }, []);

  const loadAllRestaurants = async () => {
    const url = "/api/v1/restaurants/getAllCuisineType";
    axios.get(url).then((res) => {
      const { restaurants } = res.data;
      console.log(restaurants);
      setLoadCuisineType(restaurants);
    });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT", payload: null });
    window.localStorage.removeItem("auth");
    history.push("/HP/homepage");
  };

  const LoadCuisineTypeCuisine = ({ cuisine_type }) => {
    return <option value={cuisine_type}>{cuisine_type}</option>;
  };

  return (
    <>
      <div className='banner'>
        <div className='banner-container container'>
          <h5 className='white-color-font '>
            SFSU Software Engineering Project CSC 648-848, Spring 2021 For
            Demonstration Only
          </h5>
        </div>
      </div>

      <div className='navbar navbar-light bg-light '>
        <div className='container'>
          <Link className='navbar-brand' to='/HP/homepage'>
            <img src={Logo} alt='logo' />
          </Link>
          <form className='d-flex container-sm '>
            <div className='dropdown me-3'>
              <Link
                to={{
                  pathname: "/HP/search_result_menu",
                  param1: (e) => e.target.value,
                }}
              >
                <select
                  className='btn btn-secondary dropdown-toggle'
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                >
                  <optgroup>
                    <option value='Cuisines'>Cuisine</option>
                    {loadCuisineType.map((restaurant, id) =>
                      LoadCuisineTypeCuisine(restaurant)
                    )}
                  </optgroup>
                </select>
              </Link>
            </div>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
              onChange={(e) => setSearch(e.target.value)}
              maxLength='40'
            />
            <Link to={{ pathname: "/HP/search_result_menu", param1: search }}>
              <button
                className='btn btn-search btn-outline-success'
                type='submit'
                onClick={() => dispatch(setSearchTerm(search))}
              >
                <FontAwesomeIcon icon={faSearch} size='1x' />
              </button>
            </Link>
          </form>
          <nav className='nav '>
            {auth !== null && (
              <>
                <h5 className='h6 logh5 primary-color-font'>
                  Hi, {auth.email}
                </h5>
                {auth.account_type === "restaurant" && (
                  <div className='restaurant-dropdown'>
                    <Dropdown className='dropdown'>
                      <Dropdown.Toggle
                        variant='btn btn btn-outline-primary my-3 '
                        id='dropdown-basic'
                      >
                        Menu
                      </Dropdown.Toggle>
                      <ul className='nav '>
                        <Dropdown.Menu>
                          <Dropdown.Item href='/HP/RestaurantMenu'>
                            <span className='primary-color-font me-3' to='#'>
                              Restaurant Menu
                            </span>
                          </Dropdown.Item>
                          <Dropdown.Item href='/HP/RestaurantOrderPage'>
                            <span className='primary-color-font me-3' to='#'>
                              Order Page
                            </span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </ul>
                    </Dropdown>
                  </div>
                )}

                {auth.account_type === "deliverer" && (
                  <div className='deliverer-dropdown'>
                    <Dropdown className='dropdown'>
                      <Dropdown.Toggle
                        variant='btn btn btn-outline-primary my-3 '
                        id='dropdown-basic'
                      >
                        Menu
                      </Dropdown.Toggle>
                      <ul className='nav '>
                        <Dropdown.Menu>
                          <Dropdown.Item href='/HP/DelivererMainMenu'>
                            <span className='primary-color-font me-3' to='#'>
                              MainMenu
                            </span>
                          </Dropdown.Item>
                          <Dropdown.Item href='/HP/DeliveryOrderPage'>
                            <span className='primary-color-font me-3' to='#'>
                              Order
                            </span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </ul>
                    </Dropdown>
                  </div>
                )}

                <button onClick={logout} className='btn-logout'>
                  Logout
                </button>
              </>
            )}
            {auth === null && (
              <>
                <Dropdown className='dropdown nav-dropdown'>
                  <Dropdown.Toggle
                    variant='btn btn btn-outline-primary my-3 '
                    id='dropdown-basic'
                  >
                    Login
                  </Dropdown.Toggle>
                  <ul className='nav '>
                    <Dropdown.Menu>
                      <Dropdown.Item href='/HP/CustomerSignIn'>
                        <span className='primary-color-font me-3' to='#'>
                          Login
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item href='/HP/RestaurantSignIn'>
                        <span className='primary-color-font me-3' to='#'>
                          Restaurant Login
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item href='/HP/DeliverySignIn'>
                        <span className='primary-color-font me-3' to='#'>
                          Deliverer Login
                        </span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </ul>
                </Dropdown>
                <Dropdown className='dropdown nav-dropdown'>
                  <Dropdown.Toggle
                    variant='btn btn btn-outline-primary my-3 '
                    id='dropdown-basic'
                  >
                    Register
                  </Dropdown.Toggle>
                  <ul className='nav '>
                    <Dropdown.Menu>
                      <Dropdown.Item href='/HP/UserRegistration'>
                        <span className='primary-color-font me-3'>
                          Register For Free
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item href='/HP/RestaurantRegistration'>
                        <span className='primary-color-font me-3' to='#'>
                          Restaurant Register
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item href='/HP/DeliveryRegistration'>
                        <span className='primary-color-font me-3' to='#'>
                          Deliverer Register
                        </span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </ul>
                </Dropdown>
              </>
            )}
            <ul className='py-3'>
              <Link to={{ pathname: "/HP/customerCart", param1: search }}>
                <button
                  className='nav-cart nav-link btn btn-link nav-active'
                  to='#'
                >
                  <FontAwesomeIcon icon={faCartPlus} size='2x' />
                </button>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    restaruant_menu: state.customerReducer.restaruant_menu,
    cart: state.customerReducer.cart,
    isLoggedIn: state.customerReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Navbar);
