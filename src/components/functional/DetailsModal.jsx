import React from 'react'
import Button from './Button'
import Field from './Field'
import Container from './Container'
import Modal from './Modal'

export default function DetailsModal (props){
    
    const getDropDownOptions=(e)=>{

        if(e.target.value==='DropDown')
            dropDownref.current.classList.add('show')
        else
            dropDownref.current.classList.remove('show')
        
        if(e.target.value==='RadioGroup')
            radiogroupref.current.classList.add('show')
        else
            radiogroupref.current.classList.remove('show')
    
    }

    const getValidations=(e)=>{

        if(e.target.checked)
            validatorsRef.current.classList.add('show')
        else 
            validatorsRef.current.classList.remove('show')
            console.log('ok')
    }

    const onSubmit=(e)=>{

        e.preventDefault()

        const formData=new FormData(e.target)

        const field={
            id:props.id,
            type:formData.get('type'),
            dropDownOptions:formData.get('dropDownOptions'),
            label:formData.get('label'),
            validators:{
                length:{
                    minLength:formData.get('minLength'),
                    maxLength:formData.get('maxLength')
                },
                required:formData.get('required')
            },
            radioOptions:formData.get('radiogroup'),
            placeholder:formData.get('placeholder'),
            errorMsg:formData.get('validationMessage')
        }

        props.addField(field)
        e.target.reset()
        props.modalClick()
    }
    const isRequired=()=>{
        return props.field&&props.field.required
    }
    const dropDownref=React.createRef()
    const validatorsRef=React.createRef()
    const radiogroupref=React.createRef()

    return (

        <Modal modalRef={props.modalRef} modalClick={props.modalClick}>
            
            <div className="form-container">

                <h3>Enter Details of Field:</h3>

                <form onSubmit={onSubmit}>

                    <Container> 
                        <Field type='text' name='label' required='true' label={
                        'Enter Label for Field'} value={props.field&&props.field.name}/>
                    </Container>

                    <Container>
                        <Field type='checkbox' name='required' label='Is a required Field ' {...isRequired}/>
                    </Container>

                    <Container>
                        <Field type='checkbox' name='validatorsRequired' label='Is Validations required' onChange={getValidations}/>
                    </Container>

                    <Container context='hide' containerRef={validatorsRef} >
                            <label>Length</label>
                            <Field type='text' name='minLength'
                                label='' hint='MIN LENGTH'
                            />
                            <Field type='text' name='maxLength'
                            label='' hint='MAX LENGTH'
                            />
                    </Container>
                    
                    <Container>
                        <Field type='text' name='validationMessage' label='Enter validation message'/>
                    </Container>

                    <Container>
                        <Field type='dropdown' name='type'
                            label='Select type of input' onChange={getDropDownOptions}
                            dropDownOptions='Text,DropDown,Radio,TextArea,Password,Number,Email,CheckBox'
                        />
                    </Container>
                    
                    <Container context="dropDown-options hide" containerRef={radiogroupref}>
                            <Field type='textarea' name='radiogroup' label="
                            Enter your options for radiogroup(CSV)"/>
                    </Container>
                    
                    <Container context="dropDown-options hide" containerRef={dropDownref}>
                            <Field type='textarea' name='dropDownOptions' label="
                            Enter your options for DropDown(CSV)"/>
                    </Container>
                    
                    <Container context='flex'>
                        <Button context='primary' name='ADD'/>
                        <Button context='danger' handler={props.modalClick} name='CANCEL'/>
                    </Container>
                    
                </form>
                
            </div>     
        </Modal>
    )
}
