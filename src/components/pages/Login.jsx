import React, { Component } from 'react'
import Container from '../functional/Container'
import Button from '../functional/Button'
import Field from '../functional/Field'
import {GoogleLogin} from 'react-google-login'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Axios from 'axios' 
import { loginUser } from '../../actions'

class Login extends Component {
    loginSuccess=(profile)=>{
        let user={
            id:profile.googleId,
            ...profile
        }
        Axios({
            'url':"http://localhost:3001/users/"+user.id,
            'method':'GET',
            'data':user
        }).then(res=>{
            this.props.logIn(user)
        }).catch(err=>this.createUser(user))
    }
    createUser=(user)=>{
        Axios({
            'url':"http://localhost:3001/users/",
            'method':'POST',
            'data':user
        }).then(res=>{this.props.logIn(user)}).catch(err=>console.log(err))
    }
    loginFail=()=>{
        
    }
    login=(e)=>{
        e.preventDefault()
        let user=new FormData(e.target)
        Axios({
            'url':'http://localhost:3001/users?email='+user.get('email')+"&password="+user.get('psw'),
            'method':'GET'
        }).then(res=>console.log(res)).catch(err=>console.log(err))
    }
    render() {
        return (
            <form onSubmit={this.login}>
                <Container>
                        <Field label='Emai' type='email' name='email' required='true'/>
                </Container>
                <Container>
                        <Field label='Password' name='psw' type='password' required='true'/>
                </Container>
                <Container context='flex'>
                    <Button context='primary' type='submit' handler={this.singin} name='SIGN IN'/>
                    <GoogleLogin
                        clientId="742959970187-qrfjfk8he5oiclcvpgumt08bup7gk4v2.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={(response)=>{this.loginSuccess(response.profileObj)}}
                        onFailure={this.loginFail}
                        cookiePolicy={'single_host_origin'}
                    />
                </Container>
                {this.props.user?<Redirect to='/'/>:''}   
            </form>
        )
    }
}
const mapStateToProps=state=>({
    user:state.user
})
const mapDispatchToProps=dispatch=>({
    logIn:(user)=>{dispatch(loginUser(user))}
})
export default connect(mapStateToProps,mapDispatchToProps)(Login)
