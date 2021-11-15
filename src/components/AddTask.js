import React from 'react'
import { useState } from 'react'

 const AddTask = ({onAdd}) => {
    
    const [text,setText]=useState('')
    const [day,setDay]=useState('')
    
    const submit=(e)=>{
        e.preventDefault()
        if(!text)
        {
            alert('Please fill the required!')
            return;
        }
        else{
            onAdd({text,day})
        }
        setText('')
        setDay('')
    }
    return (
        <form className='add-form' onSubmit ={submit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add task' value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Date and time</label>
                <input type='text' placeholder='Add date and time' value={day} onChange={(e) => setDay(e.target.value)}/> 
            </div>
            

            <input type='submit'value='Save' className='btn btn-block'/>
        </form>
    )
}
export default AddTask