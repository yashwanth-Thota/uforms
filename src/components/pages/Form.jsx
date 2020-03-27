import React, { Component } from 'react'
import Axios from 'axios'
import Field from '../functional/Field'
import Button from '../functional/Button'
export default class Form extends Component {
    state={
        form:{
            fields:[]
        }
    }
    getFormId=()=>{
        let urlparts=window.location.href.split('/')
        return urlparts[urlparts.length-1]
    }
    componentDidMount(){
        Axios.get('http://localhost:3001/forms/'+this.getFormId())
        .then(res=>res.data)
        .then(data=>this.setState({form:data}))
        .catch(err=>console.log(err))
    }
    submitResponse=(e)=>{
        e.preventDefault()
        let response={}
        let formData=new FormData(e.target)
        this.state.form.fields.forEach(field=>{

        console.log(field)
            response[field.name]=formData.get(field.name)
        })
        console.log(response)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submitResponse}>
                    {this.state.form.fields.map(field=>{
                        return  <Field name={field.name} dropDownOptions={field.dropDownOptions}label={field.label} type={field.type.toLowerCase()} required={field.required} errorMsg={field.errorMsg}/>                                
                    })}
                    <Button context="primary" type='submit' name='SUBMIT RESPONSE'/>
                </form>
            </div>
        )
    }
}