import React from 'react';
import Person from './Person.js';

const Book = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          deletePerson={() => deletePerson(person)}
        />
      ))}
    </ul>
  );
};

export default Book;
