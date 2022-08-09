import React from "react";
import { Link } from "react-router-dom";

function HP_Links() {
  return (
    <div>
      <header>
        <h1>
          Leave links to pages you create here so we can reach them easily:
        </h1>
        <p>You need to add routes in src/index.js for links to work also</p>
        <Link to='/'>Home</Link>
        <br></br>
        <div>
          <Link to='/HP/homepage'>HP homepage</Link>
        </div>
        <h2>Customer</h2>
        <Link to='/HP/CustomerViewRestaruantMenu'>
          CustomerViewRestaruantMenu{" "}
        </Link>
        <br></br>
        <Link to='/HP/customerCart'>CustomerCart</Link>
        <br></br>
        <Link to='/HP/CustomerSignIn'>CustomerSignIn</Link>
        <br></br>
        <Link to='/HP/UserRegistration'>UserRegistration</Link>
        <br></br>
        <h2>Restaurant</h2>
        <Link to='/HP/RestaurantOrderPage'>RestaurantOrderPage</Link>
        <br></br>
        <Link to='/HP/RestaurantDeliveryOrderDetail'>
          Restaurant Delivery Order Detail
        </Link>
        <br></br>
        <Link to='/HP/RestaurantPickupOrderDetails'>
          Restaurant Pickup Order Details
        </Link>
        <br></br>
        <Link to='/HP/RestaurantRegistration'>RestaurantRegistration</Link>
        <br></br>
        <Link to='/HP/RestaurantSignIn'>RestaurantSignIn</Link>
        <br></br>
        <Link to='/HP/RestaurantMenu'>RestaurantMenu</Link>
        <br></br>
        <Link to='/HP/RestaurantInfo'>RestaurantInfo</Link>
        <br></br>
        <h2>Delivery</h2>
        <Link to='/HP/DelivererMainMenu'>DelivererMainMenu</Link>
        <br></br>
        <Link to='/HP/DeliveryOrderPage'>DeliveryOrderPage</Link>
        <br></br>
        <Link to='/HP/DeliveryOrderDetail'>DeliveryOrderDetail</Link>
        <br></br>
        <Link to='/HP/DeliveryRegistration'>DeliveryRegistration</Link>
        <br></br>
        <Link to='/HP/DeliverySignIn'>DeliverySignIn</Link>
        <br></br>
        <h2>About Me pages</h2>
        <Link to='/HP/BryanCaldera'>BryanCaldera</Link>
        <br></br>
        <Link to='/HP/DennyFeng'>DennyFeng</Link>
        <br></br>
        <Link to='/HP/JohnTo'>JohnTo</Link>
        <br></br>
        <Link to='/HP/MarcoMarino'>MarcoMarino</Link>
        <br></br>
        <Link to='/HP/CalvinTan'>CalvinTan</Link>
        <br></br>
        <Link to='/HP/HuanNguyen'>HuanNguyen</Link>
        <br></br>
      </header>
    </div>
  );
}
export default HP_Links;
