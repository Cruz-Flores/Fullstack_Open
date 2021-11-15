import React from 'react'

const Form = ({onSubmit, handleInputChange, newPerson}) => {
    return(
        <form onSubmit={onSubmit}>
            <div>
                <input 
                type="text"
                name="name"
                placeholder="Enter name"
                value={newPerson.name} 
                onChange={handleInputChange} />
            </div>
            <div>
                <input 
                type="tel"
                name="number"
                placeholder="Enter number"
                value={newPerson.number} 
                onChange={handleInputChange} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>        
        </form>
    )
}

export default Form