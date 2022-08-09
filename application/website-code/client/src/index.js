import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./index.css";
import App from "./App";
import HP_Links from "./pages/HP_Links";
import CustomerViewRestaruantMenu from "./pages/customerViewRestaruantMenu";
import CustomerSignIn from "./pages/CustomerSignIn";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/rootReducer";
import Home from "./pages/Home/Home";
import SearchMenu from "./pages/Search/SearchMenu";
import Navbar from "./utility/Navbar/Navbar";
import Footer from "./utility/Footer/Footer";
import ResMenuPage from "./pages/ResMenuPage";
import ResInfoPage from "./pages/RestaurantInfo";
import DelivererMainMenu from "./pages/DelivererMainMenu";
import customerCart from "./pages/customerCart";
import RestaurantOrderPage from "./pages/RestaurantOrderPage";
import DeliveryOrderPage from "./pages/DeliveryOrderPage";
import DeliveryOrderDetail from "./pages/DeliveryOrderDetail";
import RestaurantDeliveryOrderDetail from "./pages/RestaurantDeliveryOrderDetail";
import RestaurantPickupOrderDetails from "./pages/RestaurantPickupOrderDetails";
import UserRegistration from "./pages/UserRegistration";
import RestaurantRegistration from "./pages/RestaurantRegistration";
import DeliveryRegistration from "./pages/DeliveryRegistration";
import RestaurantSignIn from "./pages/RestaurantSignIn";
import DeliverySignIn from "./pages/DeliverySignIn";
import BryanCaldera from './pages/BryanCaldera'
import DennyFeng from './pages/DennyFeng'
import MarcoMarino from './pages/MarcoMarino'
import JohnTo from './pages/JohnTo'
import CalvinTan from './pages/CalvinTan'
import HuanNguyen from './pages/HuanNguyen'
// private routing
import {
  RestuarantPrivateRoute,
  DelivererPrivateRoute,
  UserPrivateRoute,
} from "./components/PrivateRoute";

const store = createStore(rootReducer, applyMiddleware(thunk)); //save fake data for customerVieRestaurantMenu

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route path='/HP' component={Navbar} />
        <Switch>
          <Route exact path='/' component={App} />
          <Route exact path='/HP_Pages' component={HP_Links} />
          <UserPrivateRoute
            exact
            path='/HP/CustomerViewRestaruantMenu'
            component={CustomerViewRestaruantMenu}
          />
          <UserPrivateRoute
            exact
            path='/HP/customerCart'
            component={customerCart}
          />
          <Route exact path='/HP/CustomerSignIn' component={CustomerSignIn} />
          <DelivererPrivateRoute
            exact
            path='/HP/DelivererMainMenu'
            component={DelivererMainMenu}
          />
          <DelivererPrivateRoute
            exact
            path='/HP/DeliveryOrderDetail'
            component={DeliveryOrderDetail}
          />
          <RestuarantPrivateRoute
            exact
            path='/HP/RestaurantDeliveryOrderDetail'
            component={RestaurantDeliveryOrderDetail}
          />
          <RestuarantPrivateRoute
            exact
            path='/HP/RestaurantPickupOrderDetails'
            component={RestaurantPickupOrderDetails}
          />
          <Route
            exact
            path='/HP/UserRegistration'
            component={UserRegistration}
          />
          <Route
            exact
            path='/HP/RestaurantRegistration'
            component={RestaurantRegistration}
          />
          <Route
            exact
            path='/HP/RestaurantSignIn'
            component={RestaurantSignIn}
          />
          <Route
            exact
            path='/HP/DeliveryRegistration'
            component={DeliveryRegistration}
          />
          <Route exact path='/HP/DeliverySignIn' component={DeliverySignIn} />
          <RestuarantPrivateRoute
            exact
            path='/HP/RestaurantOrderPage'
            component={RestaurantOrderPage}
          />
          <DelivererPrivateRoute
            exact
            path='/HP/DeliveryOrderPage'
            component={DeliveryOrderPage}
          />
          <Route 
            exact path = '/HP/BryanCaldera'
            component = {BryanCaldera}
          />
          <Route 
            exact path = '/HP/DennyFeng'
            component = {DennyFeng}
          />
          <Route 
            exact path = '/HP/JohnTo'
            component = {JohnTo}
          />
          <Route 
            exact path = '/HP/MarcoMarino'
            component = {MarcoMarino}
          />
          <Route 
            exact path = '/HP/CalvinTan'
            component = {CalvinTan}
          />
          <Route 
            exact path = '/HP/HuanNguyen'
            component = {HuanNguyen}
          />
          <Route exact path='/HP/homepage' component={Home} />
          <Route exact path='/HP/search_result_menu' component={SearchMenu} />
          <RestuarantPrivateRoute
            exact
            path='/HP/RestaurantMenu'
            component={ResMenuPage}
          />
          <RestuarantPrivateRoute
            exact
            path='/HP/RestaurantInfo'
            component={ResInfoPage}
          />
        </Switch>
        <Route path='/HP' component={Footer} />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
