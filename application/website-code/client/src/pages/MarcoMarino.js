import React from "react";
import pic from "../images/MarcoTempPic.png";
import '../styling/AboutMe.css'
function MarcoMarino() {
  return (
    <div className='aboutMeContainer'>
      <div>
          <img className='aboutMeImg' src={pic} alt='MarcoTempPic' />
      </div>
      <div className='aboutMeInfoSection'>
        <h1 className='aboutMeName'>Marco Marino</h1> 
        <ul>
          <li>Role: Github Master</li>
          <li>Major: Computer Science</li>
          <li>Career Goal: Game Programming</li>
        </ul>
      </div>
    </div>
  );
}
export default MarcoMarino;
