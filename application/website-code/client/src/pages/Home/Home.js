import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chef from "../../images/cooked.svg";
import Deliverer from "../../images/deliverer.svg";
import restaurant_img from "../../images/Chef.svg";
import subscription from "../../images/subscriptions.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setId } from "../../redux/actions/customerActions";

function Home() {
  const [loadRestaurants, setLoadRestaurants] = useState([]);

  useEffect(() => {
    loadAllRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAllRestaurants = async () => {
    const url = "/api/v1/restaurants/getAllRestaurants";
    await axios.get(url).then((response) => {
      // destructure restaurant from response.data
      const { restaurants } = response.data;
      // put the restaurants data into array called setLoadRestaurant
      setLoadRestaurants(restaurants);
    });
  };

  const LoadRestaurantDetail = (props) => {
    const {
      restaurant_name,
      restaurant_logo,
      address,
      dollar_sign,
      cuisine_type,
    } = props;

    const dispatch = useDispatch();
    return (
      <div className='card card-width text-white primary-color-bg mb-3'>
        <Link
          to='/HP/CustomerViewRestaruantMenu'
          onClick={() => {
            dispatch(setId(props));
          }}
        >
          <img className='card-img-top' src={restaurant_logo} alt='Breakfast' />
          <div className='card-body'>
            <h5 className='card-title'>{restaurant_name}</h5>
            <h6 className='card-subtitle mb-2 text-muted'>
              {dollar_sign} → {cuisine_type}
            </h6>
            <p className='card-text'>{address}</p>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div>
      <header>
        <div className='  hero jumbotron jumbotron-fluid '>
          <div className=' hero-content container'>
            <h1 className='display-1 secondary-color-font logo-font'>
              Gator
              <span className='secondary-color-font'>Dash</span>
            </h1>
            <p className='h6 white-color-font'>
              Convenient meals delivered or picked up at one's disposal near
              SFSU.
            </p>
          </div>
        </div>
      </header>
      <section className='restaurant-section jumbotron jumbotron-fluid'>
        <div className='restaurant-content  container-fluid'>
          <div>
            <h1>Restaurants Within SFSU Vicinity</h1>
            <p className='lead'>
              Select your favorite restaurants to start ordering
            </p>
          </div>
          <div className='wrapper'>
            {loadRestaurants.slice(0, 6).map((restaurant, id) => (
              <LoadRestaurantDetail key={id} {...restaurant} />
            ))}
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <section className='join jumbotron jumbotron-fluid'>
        <div className='join-section container text-center  '>
          <div className='row '>
            <div className='col-4 join-about'>
              <h2 className='h1'>Join Us</h2>
              <p className='lead'>
                Become part of our team to starting earning, partnering or
                ordering. We are at your service!
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='card card-width text-white primary-color-bg mb-3'>
                <img className='card-img-top' src={Deliverer} alt='Deliver' />
                <div className='card-body card-deliverer'>
                  <h5 className='card-title card-title-right-1'>
                    Be a Deliverer
                  </h5>
                  <ul className='card-text'>
                    <li>Make extra income</li>
                    <li>GPS guidance</li>
                    <li>Work Conveniently</li>
                  </ul>
                  <Link
                    className='btn-link btn btn-outline-success py-2 my-2'
                    to='/HP/DeliveryRegistration'
                  >
                    Start Delivering
                  </Link>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='card card-width text-white primary-color-bg mb-3'>
                <img
                  className='card-img-top'
                  src={restaurant_img}
                  alt='Deliver'
                />
                <div className='card-body'>
                  <h5 className='card-title card-title-right-2'>
                    Partner With Us
                  </h5>
                  <ul className='card-text'>
                    <li>Faster ordering process</li>
                    <li>Update online menu easily</li>
                    <li> Restaurant owner Registration</li>
                  </ul>
                  <Link
                    className='btn-partner btn-link btn btn-outline-success py-2 my-2'
                    to='/HP/RestaurantRegistration'
                  >
                    Become our partner
                  </Link>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='card card-width text-white primary-color-bg mb-3'>
                <img
                  className='card-img-top'
                  src={subscription}
                  alt='Deliver'
                />
                <div className='card-body'>
                  <h5 className='card-title card-user '>
                    Register To Start Ordering
                  </h5>
                  <ul className='card-text'>
                    <li>Meal fully prepared</li>
                    <li>On campus food orders</li>
                    <li>Will fit your budget needs</li>
                  </ul>
                  <Link
                    className='btn-link btn btn-outline-success py-2 my-2'
                    to='/HP/UserRegistration'
                  >
                    Register for Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='chef-section jumbotron jumbotron-fluid'>
        <div className='chef-content'>
          <div className='container'>
            <div className='row'>
              <div className='chef-about col-sm-6 white-color-font '>
                <h2>Your Next Meal Awaits You. </h2>
                <p className='lead'>
                  Neighborhood chefs around SFSU are waiting to cook your next
                  meal.
                </p>
              </div>
              <div className='col-sm-6'>
                <img className='chef-img' src={Chef} alt='chef' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
