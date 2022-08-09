import React from "react";
import pic from "../images/DF_1.JPG";
import "../styling/AboutMe.css"
function DennyFeng() {
  return (
    <div className='aboutMeContainer'>
    <div>
      <img className='aboutMeImg'src={pic} alt='Denny Feng' />
    </div>
    <div className='aboutMeInfoSection'>
        <h1 className='aboutMeName'>Denny Feng</h1>
        <h2>Backend Team Lead</h2>
        <p>
          Hello, I'm a Computer Science Student, with a passion for MERN stack
          development and design. <br></br>
          My motto is to design first then turn my
          designs into working applications. <br></br>
          Forgot pre-build templates, and
          find yourself a DevSigner!
        </p>
    </div>
    </div>
  );
}

export default DennyFeng;
