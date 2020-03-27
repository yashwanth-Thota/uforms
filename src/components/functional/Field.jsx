import React from 'react'
import Select from './Select'
import ValidationError from './ValidationError'
import RadioGroup from './RadioGroup'

export default function Field(props){
    const formControlStyle={
        border:'1px solid lightblue',
        width:'15vw',
        borderRadius:'2px',
        lineHeight: '3vh',
        backgroundColor:'white',
        height:'3vh',
        right:'15px'
    }
    const reqStyle={
        color: 'rgb(219, 60, 60)',
        fontSize:'1rem'
    }
    const errorRef=React.createRef()
    const validators=props.validators?props.validators:{}
    const validate=(e)=>{
        let isValid=true
        Object.keys(validators).forEach(validRule=>{
            switch(validRule){
                case 'length':
                    if(validators.length.minLength) isValid=(e.target.value.length>=validators.length.minLength)
                    if(isValid&&validators.length.maxLength) isValid=(e.target.value.length<=validators.length.maxLength)
                    break
                case 'required':
                    if(e.target.value) alertRequired(e)
                    else e.target.style.backgroundColor='rgba(255,0,0,0.1)'
                    break
                default:
                    isValid=true
            }   
        })
        // if(!isValid) errorRef&&errorRef.current.classList.add('show')
        // else errorRef&&errorRef.current.classList.remove('show')
        
    }
    const alertRequired=(e)=>{
        e.target.style.backgroundColor='white';e.target.setAttribute('placeholder','Required')
    }
    return (
        <div style={{width:'35vw',margin:"0rem 1rem 1rem 1rem",...props.style}}>
           <label style={{float:'left',width:'35%',left:'0',marginRight:'3vw'}}>{props.label}<span style={reqStyle}>{props.required?"*":''}</span></label>
           {
               props.type=='dropdown'?
                    <Select style={formControlStyle} name={props.name} {...props} options={props.dropDownOptions.split(',')}/> 
                    :props.type=='textarea'?
                        <textarea style={formControlStyle} name={props.name}/>
                    :props.type=='radiogroup'?
                    <RadioGroup style={formControlStyle} options={props.radioOptions.split(',')}/>
                    :<input style={formControlStyle} 
                            placeholder={props.hint} name={props.name}
                            onChange={props.onChange} onInput={validate}type={props.type}/>      
           }
           <br/>
           {props.errorMsg&&<ValidationError errorRef={errorRef} message={props.errorMsg}/>}
           {props.children}
        </div>
    )   
}