import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantMenu from "./RestaurantMenu";

const ResMenuPage = () => {
  //Here I could check which restaurant owner is logged in
  //Get restaurant id from wherever its saved whether its in redux or something else
  //Give restaurant menu the ID thtough props
  //Restaurant menu now knows which restaurant to edit because it has its DB ID
  //For all pages you have to think who can see this, logged in or not? which account type? 
  //what if someone logged in as a customer tries to get to this page, what do they see?
  return (
    <div>
      <RestaurantMenu restaurantId={1}></RestaurantMenu>
    </div> 
  );
}
export default ResMenuPage;
