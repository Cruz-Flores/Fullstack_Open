import React from "react";

export default function Button({handleClick, text}) {
    return(
        <button onClick={handleClick}>{text}</button>
    )
}

export const Header = ({text}) => <h2>{text}</h2>

export const MostVotes = (props) => {
    if(props.value>0){
        return(
            <p>{props.text}</p>
        )
    }
    return(
        <p>No votes</p>
    )
}