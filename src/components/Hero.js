import React from 'react';
import { Button } from './Button';
import './Hero.css';

function Hero() {
    return (
        <div className='hero-container'>
       
            <h1>Fluffy is Coming Soon</h1>
            <p>Adopt and Sociliaze Pets</p>
            <div className="hero-btns"> 
            
            <Button className="btns" buttonStyle="btn--primary" buttonSize='btn--xlarge'> Get Ready </Button>

            <Button className="btns" buttonStyle="btn--outline" buttonSize='btn--xlarge'> Get Started <i className= "far fa-play-circle"></i>

            </Button>
            </div>
            
        </div>
    );
}

export default Hero
