import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import MapContainer from "../components/MapContainer";
import InfoCard from "../components/InfoCard";
import "../styling/orderDetails.css"
import { connect, useSelector } from "react-redux";
import axios from 'axios';
import { useHistory } from 'react-router-dom'

function RestaurantPickupOrderDetails({ selectedID }){

    const history = useHistory();
    const { auth } = useSelector((state) => ({ ...state }));
    const [restaruant, setRestaurant] = useState({})
    const [foodName, setfoodName] = useState([])
    const [foodCount, setFoodCount] = useState([])
    const [Name, setName] = useState("[]")
    


    useEffect(() => {
        loadRestaurant();
        loadOrderDetail();
        
      }, []);

      const handleComplete = async () => {
        const url = `/api/v1/orders/removePickupOrder?id=${selectedID.id}`;
        

        try{
            axios.get(url).then((res) => {
                console.log(res)
                history.push("/HP/RestaurantOrderPage")
               // setRestaurant(res.data.orders)  
           
            
             
            }) }catch (err) {
              console.log(err);
              
            }

      }

      const loadOrderDetail = async () => {
        
        const url = `/api/v1/orders/getPickupOrder?id=${selectedID.id}`;
        
        try{
        axios.get(url).then((res) => {
          console.log(res.data.orders)

          var i;
          for( i = 0; i < res.data.orders.length; i++){
              
              console.log(res.data.orders[i].itemName)
              setfoodName(foodName.push(res.data.orders[i].itemName))
              setFoodCount(foodCount.push(res.data.orders[i].count))

          }

          console.log(foodName)
          if(foodName != undefined && foodName != null){
              let temp = ""
              for(let i = 0; i < foodName.length; i++){
                temp = temp + " - " +foodName[i] +" x" + foodCount[i]
              }
          setName(temp)
          }
         
          
        }).catch((err) =>
        {
            console.log(err);
        })}catch (err) {
          console.log(err);
          
          
        }
      };

      const loadRestaurant = async () => {
        
        const url = `/api/v1/restaurants/getRestaurantByID?id=${selectedID.fk_restaurant_id}`;
        
        try{
        axios.get(url).then((res) => {
          console.log(res)
          setRestaurant(res.data.restaurant[0])   
          console.log(res.data.restaurant[0])
          console.log(restaruant.restaurant_name)
          
        }).catch((err) =>
        {
            history.push("/HP/RestaurantOrderPage")
        })}catch (err) {
          console.log(err);
          
        }
      };

    console.log(selectedID)


    if(restaruant.restaurant_name != undefined){
    
    return(
        <div className="wrapperD">

            <InfoCard 
                restaurantName = {restaruant.restaurant_name}
                foodName = {Name}
                orderNumber = {selectedID.id}
                pickupAddress = {selectedID.pickup_address}
                price={selectedID.price}
                time={selectedID.time}
                
               
            ></InfoCard>
             <div>
            <button className ="cancelOrder" onClick={()=> handleComplete()}>Order Completed</button>
            </div>
           <MapContainer name = {restaruant.address}></MapContainer>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            
        </div>
    )
    
    }else{
        return( <div className="wrapperD"></div>)
    }
}

const mapStateToProps = (state) => {

    return {
        selectedID: state.customerReducer.selectedID,
    };
};

export default connect(mapStateToProps)(RestaurantPickupOrderDetails); 