import React from 'react'
import './index.css'

const Notification = ({ message, classEvent }) => {
    if(message === null) {
        return null
    }

    return (
        <div className={classEvent? 'succes' : 'error'}>
            {message}
        </div>
    )
}

export {Notification}