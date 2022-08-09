import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";

function Footer() {
  return (
    <div className='footer jumbotron jumbotron-fluid'>
      <div className='footer-content container'>
        <div className='row'>
          <div className='col-sm-6'>
            <h5 className='primary-color-font footer-logo-font'>
              Gator<span className='secondary-color-font'>Dash</span> © 2021
            </h5>
            <div className='col'>
              <Link to='#' className='primary-color-font me-3'>
                Privacy
              </Link>
              <Link to='#' className='primary-color-font'>
                Terms
              </Link>
            </div>
          </div>
          <div className='col footer-nav'>
            <h1 className='h4 primary-color-font '>Cusines</h1>
            <p className='lead primary-color-font'>Chinese</p>
            <p className='lead primary-color-font'>Italian</p>
            <p className='lead primary-color-font'>American</p>
            <p className='lead primary-color-font'>Korean</p>
          </div>
          <div className='col footer-nav'>
            <h1 className='h4 primary-color-font '>Places to Eat</h1>
            <p className='lead primary-color-font'>Chinese Restaurant</p>
            <p className='lead primary-color-font'>Italian Restaurant</p>
            <p className='lead primary-color-font'>American Restaurant</p>
            <p className='lead primary-color-font'>Korean Restaurant</p>
          </div>
          <div className='col footer-nav'>
            <h1 className='h4 primary-color-font '>Company</h1>
            <p className='lead primary-color-font'>Careers</p>
          </div>
          <div className='col footer-nav'>
            <h1 className='h4 primary-color-font '>About Us</h1>
            <a href='/HP/BryanCaldera' className='lead primary-color-font'>Bryan Caldera</a>
            <br></br>
            <a href='/HP/DennyFeng' className='lead primary-color-font'>Denny Feng</a>
            <br></br>
            <a href='/HP/JohnTo' className='lead primary-color-font'>John To</a>
            <br></br>
            <a href='/HP/MarcoMarino' className='lead primary-color-font'>Marco Marino</a> 
            <br></br>
            <a href='/HP/CalvinTan' className='lead primary-color-font'>Calvin Tan</a>
            <br></br>
            <a href='/HP/HuanNguyen' className='lead primary-color-font'>Huan Nguyen</a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
