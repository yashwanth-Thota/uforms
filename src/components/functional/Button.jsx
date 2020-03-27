import React from 'react'

export default function Button(props) {
    const contextstyle={
        primary:{
            backgroundColor:'rgb(24, 187, 236)'
        },
        danger:{
            backgroundColor:'rgb(179, 37, 37)'
        },
        success:{
            backgroundColor:'rgb(43, 122, 43)'
        }
    }
    const buttonStyle={
        border:'0',
        margin:'0.3rem',
        lineHeight:' 3vh',
        cursor: 'pointer',
        color:'#fff',
        ...contextstyle[props.context]
    } 
    const handler=(field)=>{
        return props.handler
    }
    return (
        <button type={props.type} style={{...buttonStyle,...props.style}} onClick={handler(props.field)} value={props.value}>{props.name}</button>
    )
}
