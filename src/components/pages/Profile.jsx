import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Container from '../functional/Container';
import Button from '../functional/Button';
import { Redirect } from 'react-router-dom';
import Field from '../functional/Field';
import Divider from '../functional/Divider';
import { logoutUser } from '../../actions';

export default function Profile() {
    const user=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const logout=()=>{
        dispatch(logoutUser())
    }
    return (
        <Container context='flex' style={{borderColor:'white'}}>
            {!user?<Redirect to="/"/>:
            <Container>
                <Container  context='flex' style={{borderColor:'white'}}>
                    <Container className="left" style={{borderColor:'white'}}>
                        <img  src={user.imageUrl} alt="" style={{marginRight:'4rem',height:"80%",width:'90%'}}/>
                    </Container>
                    <Container className="right" style={{borderColor:'white',textAlign:'left'}}>
                        <h3>Name: <em style={{color:'red'}}>{user.name}</em></h3>
                        <h3 style={{wordWrap: 'break-word'}}>Email: <em style={{color:'red'}}>{user.email}</em></h3>
                        <Button style={{padding:'0.5rem 1.2rem 0.5rem 1.2rem'}} name='LOG OUT' context='danger' handler={logout}/>
                    </Container>
                </Container>
                <Divider/>
                <br/>
                <Container style={{borderColor:"white"}}>
                    <h4>CHANGE YOUR PASSOWRD</h4>
                <Field label="Enter your old password" type='password' 
                                    value={""}
                                    onChange={()=>{}} required='true' style={{textAlign:'left'}} validators={{'required':true}}/>
                <Field label="Enter your new password" type='password' 
                                    value={""} 
                                    onChange={()=>{}} required='true' style={{textAlign:'left'}} validators={{'required':true}}/>
                <Field label="Confirm your new password" type='password' 
                                    value={""} style={{textAlign:'left'}}
                                    onChange={()=>{}} required='true' validators={{'required':true}}/>
                <Button className="right" style={{padding:'0.5rem 1.2rem 0.5rem 1.2rem'}} name='SAVE ' context='primary' handler={logout}/>
                </Container>
            </Container>}
        </Container>
    )

}
