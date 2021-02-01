import React, {useState}  from 'react';
import banner from '../../assets/banner.jpg'
import 'aos/dist/aos.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Banner.css';

function Banner({loggedIn, users, setVisibility, setVisibilityRegister}) {
  return (
    <div className="intro">
          <div className="content" data-aos="fade-right" data-aos-offset="300" data-aos-duration="600" data-aos-easing="ease-in-sine">
            <h1>“ No matter how much experience you have, there’s always something new you can learn and room for improvement ”</h1>
            <article>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis felis quam, eget tincidunt diam pharetra a. Integer scelerisque massa nec urna viverra, 
            quis lobortis lorem viverra. Nam feugiat aliquet imperdiet. In ac nulla arcu. Donec ut fermentum arcu. Cras sit amet pellentesque est. Ut orci massa, rutrum sit amet sem at, consequat posuere nisl. 
            Morbi fringilla eros ut lacus vehicula, ac facilisis leo elementum. Integer ornare facilisis fermentum. Praesent convallis, sapien quis ultricies porttitor,
             lacus erat venenatis leo, quis bibendum purus velit vitae tortor. Donec volutpat nulla ex, consectetur lacinia erat eleifend eu. Sed blandit vestibulum aliquam.
            </article>                  
            {loggedIn === true ? null : <button onClick={() => setVisibility(true)}>Sign in</button>}
            <button onClick={() => setVisibilityRegister(true)}>Register</button>
          </div>
          <div className="bannerImage">
            <img src={banner} alt="bannerimage"/>           
          </div>        
    </div>
  );
}

export default Banner;