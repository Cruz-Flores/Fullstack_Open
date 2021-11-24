import React, { useState, useEffect } from 'react';
import bookService from './services/phonebook.js';
import Filter from './components/Filter.js';
import Form from './components/Form.js';
import Book from './components/Book.js';
import { Notification } from './components/Notification.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  });
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log('effect');
    bookService.getAll().then((data) => {
      console.log('promise fulfilled');
      setPersons(data);
    });
  }, []);

  const notifyWith = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleInputChange = (event) => {
    setNewPerson({
      ...newPerson,
      [event.target.name]: event.target.value,
    });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
    };

    const existing = persons.find(
      (p) => p.name.toLowerCase() === personObject.name.toLowerCase()
    );
    if (existing) {
      const ok = window.confirm(
        `${existing.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (ok) {
        const personReplaced = { ...existing, number: personObject.number };
        bookService
          .update(personReplaced.id, personReplaced)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            notifyWith(`Changed number of  ${existing.name}`, 'succes');
            setNewPerson({
              name: '',
              number: '',
            });
          })
          .catch((error) => {
            notifyWith(
              `Information of ${personReplaced.name} has already been removed from server`,
              'error'
            );
            setPersons(persons.filter((n) => n.id !== personReplaced.id));
          });
      }
    } else {
      bookService
        .create(personObject)
        .then((addedPerson) => {
          notifyWith(`Added ${personObject.name}`, 'succes');
          setPersons(persons.concat(addedPerson));
          setNewPerson({
            name: '',
            number: '',
          });
        })
        .catch((error) => notifyWith(error.response.data.error, 'error'));
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      bookService
        .deletePerson(person.id)
        .then((response) => {
          setPersons(persons.filter((n) => n.id !== person.id));
          notifyWith(`Deleted ${person.name}`, 'succes');
        })
        .catch(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
          notifyWith(`${person.name} has already been removed`, 'error');
        });
    }
  };

  console.log('render', persons.length, 'persons');

  const personsToShow =
    filter.length === 0
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <Form
        onSubmit={addPerson}
        handleInputChange={handleInputChange}
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      <Book persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
