import React from 'react'
import './Home.css'
import image from '../../assets/image.png';
import Card from '../SharedComponents/Card'
import profile from '../../assets/pro.jpg'
import HeaderMain from '../SharedComponents/HeaderMain';
import Footer from '../SharedComponents/Footer';

const Home = () => {
  return (
    <div className="homepage">
        <div className="homeApp">
            <HeaderMain/>
        </div>
        <main className='homemain'>
            <div className="welcome">
                <div className="descrp">
                    <h1> The Room Management System </h1>
                    <p>This system provides a centralized and efficient solution for managing classrooms, laboratories, and other learning spaces. Through our intuitive web-based interface . 
                    Why Choose This System? This platform not only simplifies administrative tasks but also enhances the learning experience by ensuring that educational spaces are utilized efficiently. Whether you’re managing a small institution or a large university, this solution scales to meet your needs.
                    </p>
                </div>
                <div className="img">
                    <img src={image} alt="image" />
                </div>
            </div >
            <div className="card-org">
            <Card name="HASSAN HAMDI" 
                position="DIRECTOR" 
                said="As an institution dedicated to fostering excellence, we recognize the need for innovative solutions to optimize our resources and enhance the learning experience. This Room Management System is more than just a scheduling tool—it's a cornerstone of our commitment to efficiency, transparency, and adaptability."
                profile={profile} />
            <Card name="HASSAN HAMDI" 
                position="DIRECTOR" 
                said="As an institution dedicated to fostering excellence, we recognize the need for innovative solutions to optimize our resources and enhance the learning experience. This Room Management System is more than just a scheduling tool—it's a cornerstone of our commitment to efficiency, transparency, and adaptability."
                profile={profile} />
            </div>
            <div>
                <Footer/>
            </div>
            
        </main>
    </div>
  )
}

export default Home ;