import React from 'react'

const headerStyle = {
    background: '#bcbcbc',
    width: '100vw',
    height: '64px',
    display: 'flex',
    justifyContent: 'flex-end'
};
const buttonStyle = {
    background: '#bcbcbc',
    margin: '1rem 3rem 1rem 0',
}
export default function Header() {

    return (
        <div style={headerStyle}>
            <button style={buttonStyle}>
                add
            </button>
        </div>
    )
}

