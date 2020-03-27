
import React, { Component } from 'react'
import Axios from 'axios'
import $ from 'jquery'
import {connect} from 'react-redux'
import './css/CreateForm.css'
import DetailsModal from '../functional/DetailsModal'
import Field from '../functional/Field'
import SideNavigation from '../functional/SideNavigation'
import Button from '../functional/Button'
import Container from '../functional/Container'


class CreateForm extends Component {
    
    state={
        formName:'',
        form:'',
        fields:[]  ,
        field:null,
        style:"relative"
    }
    ref=React.createRef();
    constructor(props){
        super(props)
        this.detailsModalref=React.createRef()
        this.formNameModalref=React.createRef()
        this.createFormRef=React.createRef()
        this.formId=this.getFormId()
    }

    componentDidMount(){

        Axios.get('http://localhost:3001/forms/'+this.getFormId())
        .then(res=>res.data)
        .then(data=>{
            this.setState({fields:data.fields})
            this.setState({form:data})
        })
        .catch(err=>console.log(err))
    }
    setMenuStyle=(style)=>{
        if(style==='absolute'){
            this.ref.current.classList.add('positionRelativeToAbsoulte')
            this.ref.current.classList.remove('positionAbsoulteToRelative')
        }else{
            this.ref.current.classList.add('positionAbsoulteToRelative')
            this.ref.current.classList.remove('positionRelativeToAbsoulte')
        }
    }
    render() {
        return (
            <Container context="flex col" style={{padding:'0',width:'100%',borderColor:'white',margin:'0',borderWidth:'0'}}>
               <Container style={{width:"10%",height:'auto',padding:'0',margin:'0',borderColor:'white'}}>
                   <SideNavigation {...this.props} setMenuStyle={this.setMenuStyle} style={this.state.style}/>
                </Container>
                <Container containerRef={this.ref} className="flex" style={{width:"85%",position:this.state.style,height:'100%',borderColor:'white',margin:'0 auto'}}>
                    <Container style={{borderColor:'white'}}>
                        <Container context='flex' style={{borderColor:'white'}}>
                            <Container context="flex" style={{borderColor:'white'}}>
                            <Field label="Enter your Form name:" type='text' 
                                    value={this.state.formName} 
                                    onChange={this.handleChange} required='true' validators={{'required':true}} enable={this.enable}/>
                            <Button context="success" handler={this.createForm} name='SAVE FORM'/>
                            <Button context="primary" handler={this.detailsModalClick} name='ADD FIELD'/>
                            </Container>
                        </Container>
                        
                    <Container className="flex" style={{borderColor:'red'}} >
                        <h2>PREVIEW</h2>
                        {this.state.fields.length>0?<Container>{this.state.fields.map(field=>{
                            return (
                                <Container  style={{borderColor:'white'}}>
                                    <Field name={field.name} dropDownOptions={field.dropDownOptions}
                                            radioOptions={field.radioOptions}
                                            label={field.label} type={field.type.toLowerCase()} 
                                            required={field.required} errorMsg={field.errorMsg} validators={field.validators}/>
                                    <Button context='danger' handler={this.removeField} value={field.id} name='DELETE'/>
                                    {/* <Button context='primary' handler={this.editField} field={field} name="EDIT"/> */}
                                    
                                </Container>
                            )
                        })}</Container>:
                            <p style={{margin:"auto"}}>You haven't added a field ...!</p>
                        }
                    </Container>
                    </Container> 
                </Container>

                <div className="alert" id="alert">
                    <p id='alert-msg'> </p>
                    <span className='close' onClick={()=>{$('#alert').fadeOut()}}>X</span>
                </div>

                <DetailsModal modalRef={this.detailsModalref} field={this.state.field} modalClick={this.detailsModalClick} data={this.state.field} 
                    id={this.state.fields.length} addField={this.addField}/>
            </Container>
        )
    }



    detailsModalClick=()=>{
        this.detailsModalref.current.classList.toggle('show')
    }

    handleChange=(e)=>{
        this.setState({formName:e.target.value})
    }

    addField=(field)=>{
        this.setState({fields:this.state.fields.concat({...field,id:this.state.fields.length})})
        
    }

    editField=(field)=>{
        this.setState({field:field})
        this.detailsModalClick()
    }
    removeField=(e)=>{
        this.setState({fields:this.state.fields.filter(field=>{return field.id!=e.target.value})})
    }

    updateForm=()=>{
        this.setAlert()
        Axios({
            "url":"http://localhost:3001/forms/"+this.props.user.id+"/"+this.formId,
            "method":"PUT",
            "data":{
                'id':this.formId,
                'name':this.state.formName,
                fields:this.state.fields
            }
        })
        .then(res=>{
           $('#alert').fadeIn(1000)
        })
        .catch(err=>this.updateForm())
    }

    createForm=()=>{
        Axios({
            "url":"http://localhost:3001/forms/"+this.props.user.id,
            "method":"POST",
            "data":{
                'id':this.formId,
                'name':this.state.formName,
                fields:this.state.fields
            }
        })
        .then(res=>{
            $('#alert').fadeIn(1000)
        })
        .catch(err=>console.log(err))
    }

    setAlert=()=>{
        document.getElementById('alert-msg').innerHTML="Your shareable form url is http://localhost:3000/forms/"+this.formId
    }
    
    getFormId=()=>{
    
        let urlparts=window.location.href.split('/')
        return urlparts[urlparts.length-1]+""
    }
}
const mapStateToprops=state=>({
    user:state.user
})
export default connect(mapStateToprops)(CreateForm)