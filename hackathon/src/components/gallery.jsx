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
        <div className="leftsection">
            <span className="orange">TARSHDEEP KAUR</span> <span class="purple">is saying you a hello </span>
            <span id="element" ref={element}></span>
            <span className="typed-cursor typed-cursor--blink " aria-hidden="true">|</span>
        </div>
    );
}

export default Gallery;



