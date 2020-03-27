import React from 'react'

export default function ValidationError(props) {
    const errorStyle={
        width:'15vw',
        borderRadius:'2px',
        lineHeight: '3vh',
        color:'red',
        padding:'2px',
        fontSize:'12px'
    }
    return (
        <span ref={props.errorRef} className='hide' style={errorStyle}>{props.message}</span>
    )
}
