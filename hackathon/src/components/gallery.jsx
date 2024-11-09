import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import '../styles/gallery.css';

function Gallery() {
    const element = useRef(null);

    useEffect(() => {
        
        const typed = new Typed(element.current, {
            strings: [
                'and introducing you',
                'to her professional experience',
                'of being',
                'a WEB DEVELOPER'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });

        // Cleanup function to destroy Typed instance on component unmount
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <div className='mainSection' >
        <div className="leftsection">
            <span className="orange">We’re here to introduce <span class="purple">DigiNyay </span> ,an encrypted communication platform specifically designed for the legal industry. Lawyers and their assistants  face unique challenges with confidentiality and data protection</span> 
            <span id="element" ref={element}></span>
            <span className="typed-cursor typed-cursor--blink " aria-hidden="true">|</span>
        </div>
        <a href='/login' ><button className='blackBtn' >REGISTER</button></a>
        </div>
    );
}

export default Gallery;



