import React from 'react';

const Home = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center', padding: '20px', border: '2px solid #ccc', borderRadius: '10px' }}>
                <h1 style={{ color: '#333' }}>Welcome, You are successfully logged in</h1>
            </div>
        </div>
    );
}

export default Home;
