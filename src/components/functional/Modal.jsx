import React from 'react'
export default function Modal(props){
    const modalStyle={
        position: 'absolute',
        left:'0',
        zIndex: '1',
        backgroundColor:' rgba(0,0,0,0.4)',
        top:'7vh',
        height:'100%',
        width:'100%'
    }
    return(
        <div className='hide' style={modalStyle} ref={props.modalRef}>
           <span className="close-btn pointer" onClick={props.modalClick}>X</span> 
            {props.children}   
        </div>
    )
}