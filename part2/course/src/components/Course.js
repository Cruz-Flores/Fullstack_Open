import React from 'react';
import Header from './Header.js'
import Content from './Content.js' 
import Total from './Total.js'

const Course = ({course}) => 
    <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
    </>

export default Course
