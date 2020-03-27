import React, { Component } from 'react'
import uuidv4 from 'uuid'
import Axios from 'axios'
import {connect} from 'react-redux'
import Card from '../functional/Card'
import Button from '../functional/Button'
import './css/Home.css'

class Home extends Component {

    state={
        userForms:[],
        redirectUrl:''
    }

    componentDidMount(){
       if(this.props.user){
             Axios.get('http://localhost:3001/forms/'+this.props.user.id)
                .then(res=>res.data)
                .then(data=>this.setState({userForms:data}))
                .catch(err=>this.createForms())
       }
    }

    createForms=()=>{
        Axios.post('http://localhost:3001/forms/',{"id":this.props.user.id,"forms":[]})
        .then(res=>console.log('user created'))
        .catch(err=>console.log(err))
    }
    render() {

        return (

            <div>
                <h3>Available Forms</h3>
                <div className='flex'>
                    {this.state.userForms.length>0&&this.state.userForms.map(form=>{   
                        return (
                        <Card context="container" >
                            <h3 className="form-title">{form.name}</h3>
                            <p>
                                <Button context="primary" handler={()=>{this.setState({redirectUrl:'/createForm/'+form.id})}} name='EDIT'/>
                                <Button context="success" name='PREVIEW' handler={()=>{this.setState({redirectUrl:'/forms/'+form.id})}}/>
                            </p>
                        </Card>
                        )
                    })}

                    <Card>
                        <span className="add pointer" onClick={this.createForm}>+</span>
                    </Card>
                    {this.renderRedirect()}
                </div>
            </div>
        )
    }

    renderRedirect=()=>{

        if(this.state.redirectUrl){
            let ele=document.createElement('a')
            ele.setAttribute('href',this.state.redirectUrl)
            if(this.state.redirectUrl) ele.click()
        }
    }
    createForm=()=>{

        this.setState({redirectUrl:'/createForm/'+uuidv4()})
    }
}
const mapStateToProps=state=>({
    user:state.user
})
export default connect(mapStateToProps)(Home)