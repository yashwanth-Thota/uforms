import React from 'react'
import Modal from './Modal' 
import Field from './Field';
import Button from './Button';
import Container from './Container';
export default function SignUpModal(props) {
    const signUp=()=>{

    }
    return (
            <Modal modalRef={props.modalRef} modalClick={props.modalClick}>
                <div className='form-container rounded'>
                    <form onSubmit={signUp}>

                           <Container>
                                <Field name='formName'
                                label='Enter Name' type='text' 
                                required='true' errorMsg='Eamil Name is required'/>
                            </Container>
                            <Container>
                                <Field name='formName'
                                label='Enter Password' type='text' 
                                required='true' errorMsg='Password Name is required'/>
                            </Container>
                        <Button context='danger' name='CANCEL' handler={props.modalClick}/>
                        <Button context='primary' name='SIGN UP'/>

                    </form>
                </div>
            </Modal>
    )
}
