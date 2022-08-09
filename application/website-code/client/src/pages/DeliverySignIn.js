import React, { useEffect, useState } from "react";
import "../styling/Customer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "../styling/Registration.css";
import "./Register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";

//loader css
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
`;

const DeliverySignIn = () => {
  const [email, setStateEmail] = React.useState("d@gmail.com");
  const [password, setStatePassword] = React.useState("123456");
  const [loading,setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    //setLoading is for the loader
    setLoading(true);
    const data = {
      email,
      password,
    };

    try {
      const res = await axios.post("/api/v1/auth/delivererLogin", data);
      // save user and token to localstorage
      window.localStorage.setItem("auth", JSON.stringify(res.data));
      // save data to redux
      dispatch({
        type: "LOGGED_IN_USER",
        payload: res.data,
      });
      console.log("RESTAURANT INFORMATION: ", res);
      history.push("/HP/DelivererMainMenu");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // Need to start with a div to style more efficiently
    <div className='auth-form'>
      {/* If no bootstrap container form will be all the way to the left  */}
      <form className='formClass container' onSubmit={handleSubmit}>
        <h1 className='formH1Class'>Delivery Sign In </h1>

        <label className='labelClass'>
          Please enter your email:
          <input
            className='inputClass'
            name='email'
            type='email'
            value={email}
            onChange={(e) => setStateEmail(e.target.value)}
            required
          />
        </label>

        <label className='labelClass'>
          Please enter your password:
          <input
            className='inputClass'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setStatePassword(e.target.value)}
            required
          />
        </label>
        {"\n"}

        <Link>Forgot your password?</Link>

        <button className='buttonClass'>Sign In</button>

        <h2 className='formH2Class'>Or </h2>

        <lable className='formP'>
          <p>Need a Delivery Account?</p>
          <Link to='/HP/DeliveryRegistration'>Register now</Link>
        </lable>

        <Link className='linkClass' to='/HP/CustomerSignIn'>
          Customer Sign In
        </Link>
        <Link className='linkClass' to='/HP/RestaurantSignIn'>
          Restaurant Sign In
        </Link>
      </form>
      {
       /*loader component below
       */
       }

      <div className="sweet-loading">
        <BounceLoader color={"#966CA2"} loading={loading} css={override} size={100} />
      </div>
    </div>
  );
};

export default DeliverySignIn;
