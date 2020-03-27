import React from 'react'

export default function Card(props) {
    const cardStyle={
        height:'20vh',
        margin:'0 2rem 0 2rem',
        textAlign: 'center',
        width:'18vw',
        border:'0.6px solid lightgrey'
    }
    return (
        <div className='card' style={cardStyle}>
            {props.children}
        </div>
    )
}
