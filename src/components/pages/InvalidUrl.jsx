import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
export default class InvalidUrl extends Component {
    state={
        time:15,
        x:''
    }
    componentDidMount(){
        this.setState({x:setInterval(this.startTimer,1000)})
    }
    startTimer=()=>{
        this.setState({time:this.state.time-1})
    }
    renderRedirect=()=>{
        if(this.state.time==0){
            clearInterval(this.state.x)
            return (
                <Redirect to='/'/>
            )
        }
    }
    render() {
        return (
            <div style={{margin:'auto',height:'100vh',width:'100vw',textAlign:'center'}}>
                <h3>Requested page is <span style={{color:"red"}}>not</span> found!</h3>
                <h4 style={{color:'grey'}}>You are automatically redirected to home page in {this.state.time} seconds</h4>
                {this.renderRedirect()}
            </div>
        )
    }
}
