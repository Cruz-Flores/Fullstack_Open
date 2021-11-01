import React from 'react'

const Form = ({onSubmit, handleInputChange, newName, newNumber}) => {
    return(
        <form onSubmit={onSubmit}>
            <div>
                <input 
                name="name"
                placeholder="Enter name"
                value={newName} 
                onChange={handleInputChange} />
            </div>
            <div>
                <input 
                type="tel"
                name="number"
                placeholder="Enter number"
                value={newNumber} 
                onChange={handleInputChange} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>        
        </form>
    )
}

export default Form