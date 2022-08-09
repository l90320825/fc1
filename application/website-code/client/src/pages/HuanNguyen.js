import React from "react";
import "../styling/AboutMe.css"
function HuanNguyen() {
  let pic = "https://i.imgur.com/q8mUEcu.jpg";
  return (
    <div className='aboutMeContainer'>
      <div>
        <img className='aboutMeImg'src={pic} alt="Huan's photo" />  
      </div>
      <section className='aboutMeInfoSection'>
        <h1 className='aboutMeName'>Huan NguyenKim</h1>
        <h2>Team Member</h2>
        <ul>
          <li>Hello ladies and gentlemen!</li>
          <li>My name is Huan NguyenKim</li>
          <li>I'm a Computer Science major at SFSU</li>
          <li>I love the military</li>
        </ul>
      </section>
    </div>
  );
}

export default HuanNguyen;
