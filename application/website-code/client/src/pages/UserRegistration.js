import React, { Component } from "react";
import "../styling/Registration.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
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


function UserRegistration({ dispatch }) {
  const [username, setUsername] = React.useState("test000");
  const [email, setEmail] = React.useState("test@sfsu.edu");
  const [password, setPassword] = React.useState("123456");
  const [address, setAddress] = React.useState("some address");
  const [phone_number, setPhone_Number] = React.useState("44444444");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const history = useHistory();
  const [loading,setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    const emailRegex = /^\"?[\w-_\.]*\"?@sfsu\.edu$/;
    event.preventDefault();
    setLoading(true);
    const data = {
      username,
      email,
      password,
      address,
      phone_number,
    };
    if (!emailRegex.test(email)) {
      console.log("Please use a sfsu email");
    } else {
      try {
        const res = await axios.post("/api/v1/auth/registerApprovedUser", data);
        console.log("USER INFORMATION: ", res);
        history.push("/HP/CustomerSignIn");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    // Need to start with a div to style more efficiently
    <div className='auth-form'>
      {/* If no bootstrap container form will be all the way to the left  */}
      <form className='formClass container' onSubmit={handleSubmit}>
        <h1 className='formH1Class'>Create Free Account</h1>

        <label className='labelClass'>
          Username:
          <input
            className='inputClass'
            name='name'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className='labelClass'>
          Email:
          <input
            className='inputClass'
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className='labelClass'>
          Password:
          <input
            className='inputClass'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className='labelClass'>
          Address:
          <input
            className='inputClass'
            name='address'
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label className='labelClass'>
          Phone number:
          <input
            className='inputClass'
            name='phone number'
            type='number'
            value={phone_number}
            onChange={(e) => setPhone_Number(e.target.value)}
            required
          />
        </label>

        <label className='labelClass'>
          <input
            className='inputClass'
            name='acceptedTerms'
            type='checkbox'
            onChange={(e) => setAcceptedTerms(e.target.value)}
            required
          />
          I accept the terms of service
        </label>

        <button className='buttonClass'>Register</button>
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
}

export default UserRegistration;
