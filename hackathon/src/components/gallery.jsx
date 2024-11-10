import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import '../styles/gallery.css';

function Gallery() {
    const element = useRef(null);

    useEffect(() => {
        
        const typed = new Typed(element.current, {
            strings: [
                'Connecting you anonymously',
                'To legal professionals',
                'For confidential consultations',
                'On our secure platform'
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
            <span className="orange">We’re here to introduce <span class="purple">AdvoTalk </span> ,an encrypted communication platform specifically designed for the legal industry. Lawyers and their assistants  face unique challenges with confidentiality and data protection.</span> 
            <br></br>
            <br></br>
            <span id="element" ref={element}></span>
            <span className="typed-cursor typed-cursor--blink " aria-hidden="true">|</span>
        </div>
        <br></br>
        <a href='/login' ><button className='blackBtn' >REGISTER</button></a>
        </div>
    );
}

export default Gallery;



