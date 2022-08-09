import React from "react"
import MapContainer from "./MapContainer"
import "../infoCard.css"

function InfoCard (props){
    return(
        <div className = "infoCard">
            {/*the style = display:props.etc makes sure the item only renders the element if the corresponding prop exists */}
            <img className = "imageContainer" src = {props.img}></img>

            <div style ={{padding:"10px"}}>
                <p style = {{display: props.restaurantName ? "block":"none"}}><b>Restaurant Name: </b>{props.restaurantName}</p>
                <p style = {{display: props.restaurantAddress ? "block":"none"}}><b>Restaurant Address: </b>{props.restaurantAddress}</p>
                <p style = {{display: props.pickupAddress ? "block":"none"}}><b>Pickup Address: </b>{props.pickupAddress}</p>
                <p style = {{display: props.foodName ? "block":"none"}}><b>Food Name: </b>{props.foodName} </p>
                <p style = {{display: props.orderNumber ? "block":"none"}}><b>Order Number: </b>{props.orderNumber}</p>
                <p style = {{display: props.pickupTime ? "block":"none"}}><b>Pickup Time: </b>{props.pickupTime}</p>
                <p style = {{display: props.orderersInfo ? "block":"none"}}><b>Orderer's Info: </b>{props.orderersInfo}</p>
                <p style = {{display: props.deliveryAddress ? "block":"none"}}><b>Delivery Address: </b>{props.deliveryAddress}</p>
                <p style = {{display: props.deliveryTime ? "block":"none"}}><b>Delivery Time: </b>{props.deliveryTime}</p>
                <p style = {{display: props.deliveredTime ? "block":"none"}}><b>Delivered Time: </b>{props.deliveredTime}</p>
                <p style = {{display: props.deliveredDate ? "block":"none"}}><b>Delivered Date: </b>{props.deliveredDate}</p>
                <p style = {{display: props.deliveryDate ? "block":"none"}}><b>Delivery Date: </b>{props.deliveryDate}</p>
                <p style = {{display: props.deliverersName ? "block":"none"}}><b>Deliverer's Name: </b>{props.deliverersName}</p>
                <p style = {{display: props.status ? "block":"none"}}><b>Status: </b>{props.status}</p>
                <p style = {{display: props.price ? "block":"none"}}><b>Price: </b>{props.price}</p>
                <p style = {{display: props.specialInstructions ? "block":"none"}}><b>Special Instructions: </b>{props.specialInstructions}</p>
                <p style = {{display: props.time ? "block":"none"}}><b>Time: </b>{props.time}</p>

                </div>
        </div>
    )
}

export default InfoCard