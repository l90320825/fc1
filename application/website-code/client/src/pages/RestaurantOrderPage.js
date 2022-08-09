import React, { useState, useEffect } from "react"
import "../styling/RestaurantOrderPage.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styling/DelivererMainMenu.css";
import InfoCard from "../components/InfoCard"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { setId } from "../redux/actions/customerActions";

const RestaurantOrderPage = () => {

    const history = useHistory();
    const [orders, setOrders] = useState([]);
    const [pickupOrders, setPickupOrders] = useState([]);
    const dispatch = useDispatch();

    const { auth } = useSelector((state) => ({ ...state }));

    const handleClick = () => {
        history.push("/HP/RestaurantDeliveryOrderDetail")
    }

    const handleClick2 = () => {
        history.push("/HP/RestaurantPickupOrderDetails")
    }


    useEffect(() => {
        loadDeliveryOrder();
        loadPickupOrder();
    }, []);

    const loadDeliveryOrder = async () => {
        const url = `/api/v1/orders/deliveryOrders`;
        try {
            axios.get(url).then((res) => {
                console.log(res)
                setOrders(res.data.orders)

            }).catch((err) => {
                console.log(err);
            })
        } catch (err) {
            console.log(err);
            //setMenu(0);
        }
    };

    const loadPickupOrder = async () => {
        const url = `/api/v1/orders/pickupOrders`;
        try {
            axios.get(url).then((res) => {
                console.log(res)
                setPickupOrders(res.data.orders)

            }).catch((err) => {
                console.log(err);
            })
        } catch (err) {
            console.log(err);
            //setMenu(0);
        }
    };

    return (
        <div>

            <div className="Title">
                <p><b>Current available orders in your area</b></p>
            </div>
            <h3 className="text-center">Delivery Orders</h3>
            <h1 className='overHeading'>
                <div className='orderSection'>
                
                    {orders.map((orders) =>

                        < div className='infoSheet'>
                            {console.log(orders)}
                            <InfoCard
                                restaurantName={orders.RestaurantName}
                                orderNumber={orders.id}
                                timeCreated={orders.created}
                                deliveryAddress={orders.delivery_address}
                            ></InfoCard>
                            <button className='confirmButton' onClick={() => { dispatch(setId(orders)); handleClick() }}>View Order</button>
                        </div>
                    )}

                </div>
                <h3 className="text-center">Pickup Orders</h3>
                <div className='orderSection'>
                    
                    {pickupOrders.map((orders) =>

                        < div className='infoSheet'>
                            {console.log(orders)}
                            <InfoCard
                                restaurantName={orders.RestaurantName}
                                orderNumber={orders.id}
                                timeCreated={orders.created}
                                deliveryAddress={orders.delivery_address}
                            ></InfoCard>
                            <button className='confirmButton' onClick={() => { dispatch(setId(orders)); handleClick2() }}>View Order</button>
                        </div>
                    )}

                </div>
            </h1>
            <hr></hr>
        </div>
    )
}

export default RestaurantOrderPage