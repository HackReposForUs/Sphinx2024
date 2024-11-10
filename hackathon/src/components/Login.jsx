import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from './navbar';
import { BackgroundBeams } from './ui/backgroundBeams';
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('user');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [metamaskRole, setMetamaskRole] = useState('user');

    const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(isLogin ? 'Logging in' : 'Signing up', { email, password, userType });
    if(userType === 'user'){
      navigate('/joinRoom')
    }
    else{
      navigate('/generateRoom')
    }
  };
  const connectMetaMask = async () => {
    setIsConnecting(true);
    setError('');
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected to MetaMask', accounts[0]);
      } catch (error) {
        console.error('Failed to connect to MetaMask', error);
        setError('Failed to connect to MetaMask. Please try again.');
      }
    } else {
      setError('MetaMask not detected. Please install MetaMask and try again.');
    }
    setIsConnecting(false);
  };
  return (
    <div>
      <BackgroundBeams className="absolute z-0" />
      <Navbar className="" />
    <div className="container relative z-10">
      <div className="card">
        <div className="card-header">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <p>{isLogin ? 'Access your account' : 'Create a new account'}</p>
        </div>
        
        <div className="tabs">
          {['user', 'admin', 'metamask'].map(type => (
            <button key={type} onClick={() => setUserType(type)} className={userType === type ? 'active' : ''}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {userType !== 'metamask' ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required />
              </div>
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" required />
                  </div>
                  {userType === 'admin' && (
                    <div className="form-group">
                      <label htmlFor="adminCode">Admin Registration Code</label>
                      <input id="adminCode" name="adminCode" type="text" required />
                    </div>
                  )}
                </>
              )}
              <button type="submit" className="submit-btn">
                {isLogin ? 'Login' : 'Sign Up'} as {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </button>
            </form>
          ) : (
            <div>
              <div className="radio-group">
                {['user', 'admin'].map(role => (
                  <button
                    key={role}
                    type="button"
                    className={`radio-btn ${metamaskRole === role ? 'selected' : ''}`}
                    onClick={() => setMetamaskRole(role)}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
              <button onClick={connectMetaMask} disabled={isConnecting} className="submit-btn">
                {isConnecting ? 'Connecting...' : `${isLogin ? 'Login' : 'Sign Up'} with MetaMask as ${metamaskRole.charAt(0).toUpperCase() + metamaskRole.slice(1)}`}
              </button>
              {error && <p className="error">{error}</p>}
            </div>
          )}
        </div>
        <div className="card-footer">
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          // background-color: #f3f4f6;
        }
        .card {
          width: 100%;
          max-width: 400px;
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .card-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }
        .card-header p {
          color: #666;
          margin: 0.5rem 0 1.5rem;
        }
        .tabs {
          display: flex;
          margin-bottom: 1rem;
        }
        .tabs button {
          flex: 1;
          padding: 10px;
          border: none;
          background: none;
          font-size: 1rem;
          color: #666;
          cursor: pointer;
          transition: color 0.3s;
        }
        .tabs button.active {
          color: #333;
          font-weight: bold;
          border-bottom: 2px solid #333;
        }
        .tab-content {
          margin-bottom: 1rem;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #333;
        }
        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .radio-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .radio-btn {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          background-color: #f0f0f0;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          text-align: center;
          transition: background-color 0.3s;
        }
        .radio-btn.selected {
          background-color: #4f46e5;
          color: #fff;
          border: 1px solid #4f46e5;
        }
        .submit-btn {
          width: 100%;
          padding: 10px;
          background-color: #4f46e5;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .submit-btn:hover {
          background-color: #3c36d2;
        }
        .toggle-btn {
          width: 100%;
          padding: 10px;
          background: none;
          color: #4f46e5;
          border: none;
          cursor: pointer;
          text-align: center;
        }
        .error {
          color: #e11d48;
          margin-top: 1rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
