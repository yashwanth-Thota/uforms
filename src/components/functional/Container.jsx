import React from 'react'

export default function Container(props) {
    const style={
        padding:'8px',
        margin: '0 auto',
        borderWidth:'0.6px',
        borderStyle:'solid',
        borderColor:  'lightGrey',
        textAlign:'center',
        top:'0',
        alignContent:'center'
    }
    return (
        <div style={{...style,...props.style}} ref={props.containerRef} className={props.context}>
            {props.children}
        </div>
    )
}
