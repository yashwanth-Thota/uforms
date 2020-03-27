import React from 'react'
import {useSelector,useDispatch} from 'react-redux' 
import {Link} from 'react-router-dom'
import './css/Header.css'
import { logoutUser } from '../actions'
export default function Header() {
    const user=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const getMenu=()=>{
        if(user) {
            return [
                {title:"PROFILE",target:"profile"},
                {title:"LOGOUT",target:"",handler:(e)=>{dispatch(logoutUser())}}]
        }
        return [{title:"LOGIN",target:"login"}]
    }
    return (
        <header>
            <Link className="nav-item center pointer" to='/'>U<em style={{color:'orange'}}>FORMS</em></Link>
            {getMenu().map(menuItem=>{
                    return(<Link className="nav-item right" to={"/"+menuItem.target} onClick={menuItem.handler}>{menuItem.title}</Link>)
            })}
        </header>
    )
    
}