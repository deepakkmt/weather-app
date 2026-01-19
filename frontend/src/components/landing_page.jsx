import React from 'react';
import { Link } from 'react-router-dom';
function Landing_page() {
    return ( 
        <div className='container mt-5 '>
            <div className="row vh-100">
                <div className="col-6">
                   
                    <img src="/images/image.png" alt="weather-pic" className='left_img ' />

                </div>
                <div className="col-6  d-flex justify-content-center align-items-center ">
                    <div>
                        <h1 className='brand m-3 ' >Deepak weather app</h1>
                    <Link to="/signup" className="btn  m-5">Sign-up</Link>
                    <Link to="/signin" className="btn  m-5">Sign-in</Link>
                    
                    </div>

                </div>
            </div>

        </div>
     );
}

export default Landing_page;