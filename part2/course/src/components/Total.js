import React from 'react';

const Total = ({ course }) => {
    const exercises = course.parts.map(number => number.exercises)
    const sum = exercises.reduce((a, b) => a+b)
    return(
      <p><b>Number of exercises {sum}</b></p>
    ) 
  }

export default Total