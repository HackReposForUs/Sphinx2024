import React, { useState, useEffect } from 'react';

const MetaMaskLogin = () => {
    const [account, setAccount] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        checkConnection();
    }, []);

    const checkConnection = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setIsConnected(true);
                }
            } catch (error) {
                console.error('Error checking connection:', error);
            }
        }
    };

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                setAccount(accounts[0]);
                setIsConnected(true);
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
                setError('Failed to connect to MetaMask. Please try again.');
            }
        } else {
            setError('MetaMask is not installed. Please install it to continue.');
        }
    };

    const signMessage = async () => {
        if (!isConnected) {
            setError('Please connect your wallet first.');
            return;
        }

        try {
            const message = `Login request for address: ${account}`;
            const signature = await window.ethereum.request({
                method: 'personal_sign',
                params: [message, account],
            });

            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address: account, signature, message }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                setError('');
            } else {
                throw new Error(data.error || 'Authentication failed');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            setError('Authentication failed. Please try again.');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsConnected(false);
        setAccount('');
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            borderRadius: '8px'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>MetaMask Login</h2>
            {!isConnected ? (
                <button
                    onClick={connectWallet}
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Connect to MetaMask
                </button>
            ) : isAuthenticated ? (
                <div>
                    <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Authenticated as: {account}
                    </p>
                    <button
                        onClick={logout}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div>
                    <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Connected: {account}
                    </p>
                    <button
                        onClick={signMessage}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#008CBA',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Sign Message to Login
                    </button>
                </div>
            )}
            {error && (
                <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default MetaMaskLogin;