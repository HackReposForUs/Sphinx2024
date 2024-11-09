import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Site from './components/site'; // Import the Site component
import Gallery from './components/gallery';
import './App.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="hello">
                            <div className="intro">
                                <h1>BEST REVIEWS OF TECH</h1>
                                <p className="h">Thapar Institute Counselling Cell</p>
                                <Gallery />
                            </div>
                            <div className="pic">
                                <img src="bg4.webp" alt="background" />
                            </div>
                            <div className="Boxes">
                                <div className="box">
                                    <p>A safe space for you to discuss your emotions.</p>
                                    <button className="button1">CLICK ME</button>
                                </div>
                                <div className="box">
                                    <p>A safe space for you to discuss your emotions.</p>
                                    <button className="button1">CLICK ME</button>
                                </div>
                                <div className="box">
                                    <p>A safe space for you to discuss your emotions.</p>
                                    <button className="button1">CLICK ME</button>
                                </div>
                                <div className="box">
                                    <p>A safe space for you to discuss your emotions.</p>
                                    <button className="button1">CLICK ME</button>
                                </div>
                            </div>
                        </div>
                    }
                />
                <Route path="/register" element={<Site />} /> {/* Add this route for the Site component */}
            </Routes>
        </Router>
    );
}

export default App;
