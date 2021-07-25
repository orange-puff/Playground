import React from 'react';
import logo from './logo.svg';
import './App.css';

const Home = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    The personal website of John Mancini
                </p>
            </header>
        </div>
    );
}

export default Home;