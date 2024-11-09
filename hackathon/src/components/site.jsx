import React, { useState } from 'react';
import '../styles/site.css';

function Site() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='container'>
    <div className="auth-container">
      <div className="form-toggle">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <button onClick={toggleForm} className="toggle-btn">
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </button>
      </div>

      <form className="auth-form">
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" />
        </div>

        <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
    </div>
  );
}

export default Site;

