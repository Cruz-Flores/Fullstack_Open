import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Header, {Button, Statistics} from './components/components.js'

const App = () => {
    const[opinions, setOpinions] = useState({ 
      good: 0,                                
      neutral: 0,
      bad: 0
    })

    const handleGoodClick = () => 
    setOpinions({...opinions, good: opinions.good + 1}) 

    const handleNeutralClick = () => 
    setOpinions({...opinions, neutral: opinions.neutral + 1}) //el controlador de estado debe ser un funcion o un llamado a una funcion

    const handleBadClick = () => 
    setOpinions({...opinions, bad: opinions.bad + 1})
         
    const all = (op) => Object.values(op).reduce((a,b) => a + b)

    const hi = (fi, N, num) => {   
      if(N){
        return (fi / N) * num
      }
      else{
        return 0 
      }
    } 

    const allOp = all(opinions)
    const aver = hi(opinions.good, allOp, 1) + hi(opinions.neutral, allOp, 0) + hi(opinions.bad, allOp, -1)
    const average = parseFloat(aver.toFixed(4))
    const per = hi(opinions.good, allOp, 100)
    const percent = parseFloat(per.toFixed(4))
    
    return (
      <div>
        <Header text='give feedback'/>
        <Button text='good' handleClick={handleGoodClick}/> 
        <Button text='neutral' handleClick={handleNeutralClick}/> 
        <Button text='bad' handleClick={handleBadClick} />
        <Header text='statistics'/>    
        <Statistics all={allOp}
        vGood={opinions.good}
        vNeutral={opinions.neutral}
        vBad={opinions.bad}
        vAll={allOp}
        vAverage={average}
        vPositive={percent} />
      </div>
    )
  }  
  
ReactDOM.render(<App />, document.getElementById('root'))

//JSX no devuelve etiquetas, JSX es una extensión de sintaxis opcional para JavaScript que facilita mucho la escritura de sus propios componentes., despues babel transpila el codigo y devuelve codigo java script legible para el navegador
//no modificar los estados directamente, crear funcion para modificar estados *** aunque este definido como constante un array se puede modificar
//spread crea un nuevo arreglo con los datos del arreglo anterior, si se especifica un propiedad con un nuevo valor la reemplaza 
//funcion para evitar la division por 0
/* const hi = fi => fi > 0 ? fi/all() : all() */
