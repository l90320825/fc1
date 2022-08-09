/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const RestaurantInfo = (props) => {
  const [restaurant_name, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [cuisine_type, setCuisineType] = useState("American");
  const [dollar_sign, setDollarSign] = useState("");
  const [description, setDescription] = useState("");
  const [restaurant_logo, setRestaurantLogo] = useState("");
  const [url, setUrl] = useState(undefined);
  const history = useHistory();
  const [loadCuisineType, setLoadCuisineType] = React.useState([]);

  useEffect(() => {
    loadAllRestaurants();
    if (url) {
      handleSubmit();
    }
  }, [url]);

  const handleSubmit = async () => { //TODO after signin/register you should know the owner id
    //so set the owner id for this new restaurant to that 
    const data = {
      restaurant_name,
      cuisine_type,
      address,
      description,
      dollar_sign,
      restaurant_logo: url,
    };
    try {
      const res = await axios.post(//TODO return the id of the restaurant once created
        //set the restaurant id for current signed in owner to this restaurant in DB
        //make sure owner cant come back to this page once successfully created restaurant so
        //maybe have a  check if the owner has a restaurant id assigned
        "/api/v1/restaurants/restaurantInfoUpload",
        data
      )
      history.push("/HP/RestaurantMenu");
      console.log("RESTAURANT INFORMATION: ", res);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadPicture = () => {
    // upload images using cloudinary
    // and store url in db
    const data = new FormData();
    data.append("file", restaurant_logo);
    data.append("upload_preset", "restaurant_logo");
    data.append("cloud_name", "gatordash");
    fetch(
      "https://api.cloudinary.com/v1_1/gatordash/image/upload",

      {
        method: "POST",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  const RestaurantUpload = () => {
    if (restaurant_logo) {
      uploadPicture();
    } else {
      handleSubmit();
    }
  };

  const loadAllRestaurants = async () => {
    const url = "/api/v1/restaurants/getAllCuisineType";
    axios.get(url).then((res) => {
      const { restaurants } = res.data;
      console.log(restaurants);
      setLoadCuisineType(restaurants);
      console.log(loadCuisineType)
    });
  };

  const LoadCuisineTypeCuisine = ({ cuisine_type, id }) => {
    return <option value={cuisine_type}>{cuisine_type}</option>;
  };

  return (
    <div>
      {/*FRONTEND TODO*/}
      {/* Style this form w/o using needing to use <br/> b/c there's a better approach*/}
      {/* Hint: Display flex, flex-direction: column  Ex:RestaurantRegistration.js*/}
      {/* Might need to separate label/input as their own */}
      <section className='jumbotron bg-dark '>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md text-center text-white align-self-center'>
              <h2>Restaurant Set Up </h2>
              <p>Set up your restaurant to add your menus</p>
            </div>
            <div className='col-md text-white text-center '>
              <form
                className='container border rounded'
                style={{ paddingBottom: "20px", paddingTop: "20px" }}
                onSubmit={(e) => e.preventDefault()}
              >
                <label>
                  Restaurant Name:
                  <br />
                  <input
                    type='text'
                    style={{ width: "40vw" }}
                    value={restaurant_name}
                    onChange={(e) => setRestaurantName(e.target.value)}
                  />
                </label>
                <label>
                  Address:
                  <br></br>
                  <input
                    type='text'
                    style={{ width: "40vw" }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>
                <br />
                <div>
                <label>
                  Cuisine Type:
                </label>
                <br/>
                <select className=''
                onChange={(e) => (setCuisineType(e.target.value))}>
                  <option value='American'>Cuisine</option>
                  {loadCuisineType.map((restaurant, id) => (
                    LoadCuisineTypeCuisine(restaurant)
                  ))}
                </select>
                </div>
                {/*FRONTEND TODO*/}
                {/* FRONTEND:  Change this to A dropdown so owner can choose dollarsign from $ to $$$ */}
                <label>
                  Price range:
                  <br></br>
                  <select className='' onChange={(e) => (setDollarSign(e.target.value))}>
                  <option value='$'>$</option>
                  <option value='$$'>$$</option>
                  <option value='$$$'>$$$</option>
                </select>
                </label>
                <br />
                <label>
                  Description:
                  <br></br>
                  <input
                    type='text'
                    style={{ width: "40vw" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
                <br />
                <label> Upload logo </label>
                <input
                  type='file'
                  name='uploadImage'
                  className='formButton formUploadButton'
                  accept='image/*'
                  onChange={(e) => setRestaurantLogo(e.target.files[0])}
                />
                <br />
                <br />
                <br />
                <div className='text-center'>
                  <button
                    className='btn btn-primary'
                    onClick={() => RestaurantUpload()}
                  >
                    Submit Menu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default RestaurantInfo;
