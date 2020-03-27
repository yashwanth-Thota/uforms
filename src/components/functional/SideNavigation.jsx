import React from 'react'
import {useState,useEffect} from 'react'
export default function SideNav(props){
    const ref=React.createRef();
    const [isMenuClosed,setIsMenuClosed]=useState(true)
    const [isClickMenu,setIsClickMenu]=useState(false)
    const sideNavStyle={
        backgroundColor: '#454270',
        color:'#fff',
        position: "fixed",
        top:'7vh',
        margin:"0",
        left:'0',
        height:'93vh',
        zIndex: '2',
        padding:0,
        minWidth:'42px'
    }
    useEffect(()=>{
        if(!isMenuClosed){
            ref.current.classList.add('hover')
            ref.current.classList.remove('unhover')
        }else{
            ref.current.classList.remove('hover')
            ref.current.classList.add('unhover')
        }
    },[isMenuClosed, ref])
    const menuClick=(clickEvent)=>{
        if(clickEvent===0){
            if(isMenuClosed){
                props.setMenuStyle("absolute")
                setIsMenuClosed(false)
            }else{
                props.setMenuStyle("relative")
                setIsMenuClosed(true)
            }
            setIsClickMenu(!isClickMenu)
        }else{
            if(isClickMenu) return
            if(isMenuClosed){
                setIsMenuClosed(false)
            }else{
                setIsMenuClosed(true)
            }
        }
    }
    return (
            <div style={sideNavStyle} className="shadow-dark col-4" ref={ref}>
                <div className="menu-icon" onClick={()=>menuClick(0)}>&#8801;</div>
                <div style={{height:'100%',marginTop:'3.5rem'}} className="col-4" onMouseOver={menuClick} onMouseLeave={menuClick}/>
            </div>
    )
}