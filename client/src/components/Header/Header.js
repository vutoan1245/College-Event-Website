import React from 'react';
import './Header.css';

function Header(props) {
    return (
        <header className="header-container">
            <h1>University of Stuff</h1>
            {props.children}
        </header>
    );
}

export default Header;
