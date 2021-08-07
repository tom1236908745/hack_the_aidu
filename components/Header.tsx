import React from 'react';

const headerStyle = { 
    background: 'yellow', 
    width: '100vw', 
    height: '10vh',
    display: 'flex',
    justifyContent: 'flex-end',
};
const buttonStyle = {
    color: 'red',
    margin: '1rem 3rem 1rem 0'
}
export default function Header() {
  
    return (
        <div style={headerStyle}><button style={buttonStyle}>add</button></div>
    );
}

