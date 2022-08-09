
import React, { useEffect, useState } from "react";
import "../styling/customerViewRestaurantMenu.css";
import { connect } from "react-redux";
import { setCart } from "../redux/actions/customerActions";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-modal';
import "../styling/Customer.css";
import "../styling/StandardStyle.css";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";






const CustomerViewRestaruantMenu = ({ dispatch, restaruant_menu, selectedID }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [select, setSelect] = useState({});
  const [quatity, setQuatity] = useState(1);
  const [price, setPrice] = useState(1);
  const [tempPrice, setTempPrice] = useState(1);
  const [menu, setMenu] = useState([]);
  const [count, setCount] = useState(0);
  const history = useHistory();
 

 


 

  useEffect(() => {//Rerender each time the number of order reduce
    
    console.log(quatity);
    setPrice(quatity*tempPrice);
}, [quatity]
);

useEffect(() => {
  loadMenu();
  
}, []);

const loadMenu = async () => {
  const url = `/api/v1/restaurants//getAllMenuItems?restaurantId=${selectedID.id}`;
  try{
  axios.get(url).then((res) => {
    setMenu(res.data.menuItems);
    console.log(res.data.menuItems)
    console.log(selectedID)
    if(res.data.menuItems === undefined){
      history.push("/HP/search_result_menu")
 
   }
  })}catch (err) {
    console.log(err);
    //setMenu(0);
  }
};




const handleAdd = () => {
  let order = {
    name: select.items_name,
    description: select.description,
    image:select.image,
    price: price,
    quatity: quatity,
    id: count,
    rid: select.fk_restaurantid,
    restaruantName: selectedID.restaurant_name,
    restaruantAddress: selectedID.address
  }

  dispatch(setCart(order));
  setCount(count + 1);
  toast.success("Item added");

};


if(menu === undefined){
  
  return(<div>
    <div className='jumbotron bg-dark'>

      <h2 className='customer-head'>Nothing</h2>

    </div>
    </div>
    );
}else{


  return (
    <div>
      <div className='jumbotron bg-dark'>
       
        <h1 className='customer-head'>{selectedID.restaurant_name}</h1>
        <h4 className='customer-head'>{selectedID.cuisine_type}</h4>
        <h4 className='customer-head'>{selectedID.address}</h4>
        <h4 className='customer-head'>{selectedID.dollar_sign}</h4>

      </div>

      <div className='menu-background'>

      <div className='menu-head-h3'>
        <h3> Popular Items </h3>
      </div>


      <section className="order-section">
        <div className="menu-order-content">
          <div className="wrapper2">
            {menu.map((menu) =>
              <button className="customer-button" key={menu.id} onClick={() => {setModalIsOpen(true); setSelect(menu); setTempPrice(menu.price); setPrice(menu.price)}}>
                <div className="card card-width" >
                  <img className="card-img-top" src={menu.image} alt="burger"></img>
                  <div className="customer-card-body" >
                    <h5 className="customer-card-title" >{menu.items_name}</h5>
                    <p className="card-title" maxlength="12">{menu.description}</p>
                    <h6 className="card-title" >${menu.price}</h6>
                   
                   

                    {/* <button className="button " onClick={() => {dispatch(setCart(restaruant_menu));  setModalIsOpen(true);}}><p className="text-color">Add</p></button>*/}
                  </div>
                </div>
              </button>
              
            )}
          </div>
        </div>
        

      </section>
      </div>

      <Modal isOpen={modalIsOpen} >
        
        <div className="modal-form">
       
       
          <h1 >{select.items_name}</h1>
          <h4>{select.description}</h4>
          <img src={select.image} alt="burger"></img>
          <br></br>
          <br></br>
          Qty <select name="quatity" id="quatity" onChange={(e) => setQuatity(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          </select>
          <br></br>
          <br></br>
          <h4>Extra instructions</h4>
          <textarea rows="4" cols="90" maxlength="50" placeholder="Add any special requests (e.g.,food allergies, extra spicy, etc.) and the store will do its best to accommodate you."></textarea>
          <br></br>
          <br></br>
          <h4>If sold out</h4>
          <select name="If sold out" id="If sold out" >
          <option value="1">Go with merchant recommendation</option>
          <option value="2" selected>Refund this item</option>
          <option value="3">Contact me</option>
          <option value="4">Cancel entire order</option>
          </select>
          <br></br>
          <br></br>
          <button className="buttonClass" onClick={() => {setModalIsOpen(false); handleAdd(select); }}> Add to cart - ${price} </button>
          <button className="buttonClass" onClick={() => {setModalIsOpen(false);}}> Cancel </button>
          </div>

          



         
          
        </Modal>


    


   
            
        <ToastContainer />

    </div>











  )}
};

const mapStateToProps = (state) => {

  return {
    restaruant_menu: state.customerReducer.restaruant_menu,
    cart: state.customerReducer.cart,
    selectedID: state.customerReducer.selectedID,
  };
};


export default connect(mapStateToProps)(CustomerViewRestaruantMenu);
