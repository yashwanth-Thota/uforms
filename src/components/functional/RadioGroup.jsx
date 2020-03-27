import React from 'react'
import Field from './Field';
export default function RadioGroup(props) {
    return (
        <div className='flex'>
             {props.options.map(option=>{
                return <Field type='radio' label={option}><br/></Field>
            })   
        }
        </div>         
    )
}
