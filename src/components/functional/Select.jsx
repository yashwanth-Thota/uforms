import React from 'react'
import Option from './Option'
export default function Select(props) {
    const isRequired=props.required?{required:true}:{required:false}
    const isMultiSelect=props.isMultiSelect?{multiple:true}:{multiple:false}
    return (
        <select style={props.style} name={props.name} className='form-control' onChange={props.onChange} {...isMultiSelect} {...isRequired}>
            {props.options.map(option=><Option key={option} value={option}/>)}
        </select>
    )
    
}