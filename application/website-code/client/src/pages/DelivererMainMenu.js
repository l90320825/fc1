import React, {useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styling/DelivererMainMenu.css";
import InfoCard from "../components/InfoCard"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../redux/actions/customerActions"
import axios from 'axios';


const DelivererMainMenu = (props) => {
    const history = useHistory();
    const { auth } = useSelector((state) => ({ ...state }));
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();

    const handleClick = () => {
        history.push("/HP/DeliveryOrderPage")

    }

    const handleCheck = () => {
        history.push("/HP/DeliveryOrderDetail")

    }

    useEffect(() => {
        loadOrder();
        
      }, []);

      const loadOrder = async () => {
        const url = `/api/v1/orders/getOrdersForDeliverer?id=${auth.userID}`;
        try{
        axios.get(url).then((res) => {
          
          console.log(res)
          setOrders(res.data.orders)
         
        })}catch (err) {
          console.log(err);
          
        }
      };

      if(orders === undefined || orders.length === 0){
        return (
        <div>
            <div className = 'heading'>
                <h1>
                {auth.email}, Welcome         
                </h1>
        <div>
        <button className = 'button' onClick = {()=> {handleClick()}}>
            Orders
        </button>
    </div>
    </div>
    
    <div>
        <h1 className = 'orderHeading'>
            You dont have any Orders
            <div className = 'orderSection'>
            
            
            
            
            </div>
            
        </h1>
    </div>
    </div>);

      }else{
    
    return (
        <div>
            <div className = 'heading'>

                {/*
            <h1 >
                {props.name}
                Placeholder Name
                </h1>*/}

               <h1>
               {auth.email}, Welcome
               
                </h1>

        

        <div>
            {/*
            <button className = 'button'>
                Customer Reviews
            </button>
            */}

            <button className = 'button' onClick = {()=> handleClick()}>
                Orders
            </button>
            {/*
            <button className = 'button'>
                My Performance
            </button>
            */}
        </div>
        </div>
        
        <div>
            <h1 className = 'orderHeading'>
                My Orders
                <div className = 'orderSection'>

                {orders.map((orders) => 
        
        < div className='infoSheet'>
          {console.log(orders)}
         <InfoCard
         restaurantName={orders.RestaurantName}
         restaurantAddress={orders.restaurantAddress}
         orderNumber={orders.id}
         timeCreated={orders.created}
         specialInstructions={orders.time}
         deliveryAddress={orders.delivery_address}
         ></InfoCard>
         <button className ='confirmButton' onClick={()=>{dispatch(setId(orders));handleCheck()}}>Check Order</button>
         </div>
         )}
                
                
                
                
                </div>
                
            </h1>
        </div>
        </div>
    );}
}

export default DelivererMainMenu