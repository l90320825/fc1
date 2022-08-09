import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styling/customerViewRestaurantMenu.css";
import "../styling/cart.css";
import { deleteCart } from "../redux/actions/customerActions";
import { useHistory } from "react-router-dom";
import "../styling/StandardStyle.css";
import payimg from "../images/pay.png";
import Modal from 'react-modal';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";

const CustomerCart = ({ cart, isLoggedIn, dispatch }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);// for modal
    const [total, setTotal] = useState(0);//Total number of order
    const [totalPrice, setTotalPrice] = useState(0.00);// total due
    const [title, setTitle] = useState("Summary")//Title Summary or Not thing in cart
    const [address, setAddress] = useState("")// address input field
    const [select, setSelect] = useState({});//item user selected will save to this
    const { auth } = useSelector((state) => ({ ...state }));
    const [bubbleSelected, setBubbleSelected] = useState(1);
    const [time, setTime] = useState("ASAP")

    //for making placeorder button invisible after one click
    const [visible,setVisible] = useState(true);

    //const [method, setMethod] = useState("Delivery");
    const method = useRef("D");//delivery or pickup
    const pay = useRef("credit");// credit or paypal
    const show = useRef("")
    const id = useRef(89)
    const [type, setType] = useState("")
    const history = useHistory();//jump to different pages
    let count = 0;

    let theID = 0;
    let item = []
    let quatity = []


    useEffect(() => {
        for (let i = 0; i < cart.length; i++) {//calculate total due
            count = parseFloat(cart[i].price) + count
        }
        count.toFixed(2)
        setTotalPrice(count)
    }, [cart.length])

    const handleItem = async () => {
        const data = {
            itemNames: item, // save all item names in this array
            counts: quatity, //for each item put count at same index
            P_or_D: method.current, //write "P" if pickup order instead
            order_id: theID, //pickup or delivery order id that you are setting these items to
        };
        try {
            const res = await axios.post(
                "/api/v1/orders/setOrderItems",
                data
            );
            console.log("Success: ", res);
            //history.push("/HP/homepage") //push user to homepage when they check out
        } catch (err) {
            console.log("F? ", err);
        }

    }

    const handlecheckOut = async (event) => {
        event.preventDefault();
        //setVisible for place order button, for conditional rendering
        setVisible(false)
        console.log(cart)

        for (let i = 0; i < cart.length; i++) {
            item.push(cart[i].name)
            quatity.push(cart[i].quatity)
        }

        if (cart.length === 0) {
            toast.success("No Item in cart");
        }
        else if (method.current === "D") { //if delivery
            const data = {
                price: totalPrice,
                restaurantName: cart[0].restaruantName,
                delivery_address: address,
                userID: auth.userID,
                restaurantID: cart[0].rid,
                time: time,
                restaurantAddress: cart[0].restaruantAddress

            }

            console.log(data)

            try {
                await axios.post("/api/v1/orders/createDeliveryOrder", data)
                    .then((res) => {
                        console.log("Res", res.data.orders[0]);
                        theID = parseInt(res.data.orders[0].id);
                        console.log("------", theID)
                        handleItem();
                    })

            } catch (err) {
                console.log(err);
            }

            console.log(data);
        } else {  //if pickup
            const data = {
                price: totalPrice,
                restaurantName: cart[0].restaruantName,
                pickup_address: cart[0].restaruantAddress,
                userID: auth.userID,
                restaurantID: cart[0].rid,
                time: time,

            }

            try {
                const res = await axios.post("/api/v1/orders/createPickupOrder", data);
                console.log("Res", res.data.orders[0]);
                theID = parseInt(res.data.orders[0].id);
                console.log("------", theID)
                handleItem();
                //history.push("/HP/DeliverySignIn");
            } catch (err) {
                console.log(err);
            }

            console.log(data);
        }

        console.log(method.current);
        console.log(method.current === "D");

    }

    const handleDelete = () => {

        console.log(select);
        console.log(cart.indexOf(select));

        cart.splice(cart.indexOf(select), 1);

        // cart.pop()
        setTotal(cart.length);
        dispatch(deleteCart(cart));
        console.log("delete")
    };

    useEffect(() => {//Rerender each time the number of order reduce
        console.log("render");
        if (cart.length == 0) {
            setTitle("No food in cart")
        }
    }, [cart.length]
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(method)
        if (isLoggedIn === false) {
            // history.push('/HP/CustomerSignIn')
        }

    }

    function plusOne(e) {
        setSelect(e)
    }

    return (
        <div>
            <div className='menu-background'>
                <section className="order-section">
                    <h3 className="menu-head-h3">{title}</h3>
                    <div className="menu-order-content">
                        <div className="wrapper2">
                            {cart.map((cart) =>
                                <div className="card card-width">
                                    <img className="card-img-top" src={cart.image} alt="burger"></img>
                                    <div className="customer-card-body">

                                        <h5 className="customer-card-title">{cart.name}</h5>
                                        <h6 className="card-title">{cart.description}</h6>
                                        <h6 className="card-title">QTYx{cart.quatity}</h6>
                                        <button className="bottun" id="1" onClick={() => { setSelect(cart); console.log(cart); setModalIsOpen(true) }}><p className="text-color">Delete</p></button>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            <div className='jumbotron hero-bg'>
                <div className="checkout-wrapper">
                    <h2 className='head'>Amount Due: ${totalPrice.toFixed(2)}</h2>
                    <form onSubmit={handlecheckOut}>
                        <div className="order-form">
                            <h4>Method</h4>
                            <span>
                                <label className='head'>
                                    <input type="radio" name="deliveryType" value="Delivery" checked={bubbleSelected == 1} onClick={() => { setType(""); method.current = "D"; setBubbleSelected(1) }} />
                            Delivery</label><br></br>
                            </span>
                            <span>
                                <input type="radio" name="deliveryType" value="Pickup" checked={bubbleSelected == 2} onClick={() => { setType("hidden"); method.current = "P"; setBubbleSelected(2) }} />
                                <label className='head'>Pickup</label><br></br>
                            </span>
                        </div>
                        <div className="order-form">
                            <h4>Time</h4>
                            <select onChange={(e) => setTime(e.target.value)}>
                                <option value="ASAP">ASAP</option>
                                <option value="Wait 30 minute">Wait 30 minute</option>
                                <option value="Wait 60 minute">Wait 60 minute</option>
                                <option value="Wait 120 minute">Wait 120 minute</option>
                            </select>
                            <br></br>
                        </div>
                        <div className="order-form">
                            <h4>Address</h4>
                            <input className='input' placeholder="building, room" type={type} onChange={(e) => setAddress(e.target.value)} required></input>
                        </div>
                        <div className="order-form">
                            <h4>Payment</h4>
                            <select onChange={(e) => pay.current = e.target.value}>
                                <option value="credit">Credit Card</option>
                                <option value="payPal">PayPal</option>
                            </select>
                        </div>
                        {/*conditional rendering of place order button*/}
                        {visible ? 
                        <button className='cart-button'>Place Order</button>
                        :
                        <h2>Your order has been placed</h2>}
                    </form>
                </div>
            </div>

            <Modal isOpen={modalIsOpen} >

                <div className="modal-form">

                    <h1 >{select.name}</h1>
                    <h4>{select.description}</h4>
                    <img src={select.image} alt="burger"></img>
                    <br></br>
                    <br></br>
          Qty {select.quatity}

                    <br></br>
                    <br></br>

                    <br></br>
                    <br></br>
                    <button className="buttonClass" onClick={() => { setModalIsOpen(false); handleDelete() }}> Delete</button>
                    <button className="buttonClass" onClick={() => { setModalIsOpen(false); }}> Cancel </button>
                </div>
            </Modal>
            <ToastContainer />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        restaruant_menu: state.customerReducer.restaruant_menu,
        cart: state.customerReducer.cart,
        isLoggedIn: state.customerReducer.isLoggedIn,
    };
};

export default connect(mapStateToProps)(CustomerCart);