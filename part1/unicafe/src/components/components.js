import React from "react";

export default function Header({text}) {
    return(
        <h2>{text}</h2>
    ) 
}

export const Button = ({handleClick, text}) =>   
 <button onClick={handleClick}>{text}</button>
 
export const Statistic = props => 
<>
<tbody>
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>    
  </tr>
</tbody>
</>

 export const Statistics = props => {
  if(props.all){
    return(
    <table>
    <Statistic text='good' value={props.vGood} />
    <Statistic text='neutral' value={props.vNeutral} />
    <Statistic text='bad' value={props.vBad} />
    <Statistic text='all' value={props.vAll} />
    <Statistic text='average' value={props.vAverage} />
    <Statistic text='positive' value={props.vPositive} />
    </table>
    )
  } 

  return(
    <p>No feedback given</p>
  )
} 



