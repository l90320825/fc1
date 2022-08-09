import React from "react";
import pic from "../images/SelfPortrait.PNG";
import "../styling/AboutMe.css"
function CalvinTan() {
  return (
    <div className='aboutMeContainer'>
      <div>
        <img className='aboutMeImg' src={pic} alt='SelfPortrait' />
      </div>
      <div className='aboutMeInfoSection'>
        <p>
              <h1 className='aboutMeName'> Calvin Tan </h1>
            Hey my name is Calvin Tan and probably like everyone else I am a
            Computer Science major at SFSU.
              <br></br>
            With some luck this will also be my last semester.
              <br></br>
            This will be the first time for me working in a group setting for a CS
            class, very nervous but excited to learn what I can!
        </p>
      </div>
    </div>
  );
}
export default CalvinTan;
