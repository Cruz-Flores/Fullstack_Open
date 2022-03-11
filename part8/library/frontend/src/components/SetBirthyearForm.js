import React from 'react';
import Select from 'react-select';
import { useState } from 'react';
import { EDIT_BORN_AUTHOR, ALL_AUTHORS } from '../queries';
import { useMutation, useQuery } from '@apollo/client';

export const SetBirthyearForm = () => {
  const [bornString, setBorn] = useState('');
  const [name, setName] = useState({
    selectedName: null,
  });

  const [updateBornyear] = useMutation(EDIT_BORN_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const allAuthors = useQuery(ALL_AUTHORS);
  const authors = allAuthors.data ? allAuthors.data.allAuthors : [];
  const options = authors.map((a) => {
    return { value: a.name, label: a.name };
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const born = Number(bornString);
    updateBornyear({
      variables: { name, born },
    });
    setBorn('');
    setName({
      selectedName: null,
    });
  };

  const onSelectChange = (selectedOption) => {
    const { value } = selectedOption;
    setName(value);
  };

  return (
    <>
      <h2>Set Birthyear</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">name</label>
        <Select
          defaultValue={name}
          onChange={onSelectChange}
          options={options}
        />
        <label htmlFor="born">born</label>
        <input
          value={bornString}
          name="born"
          type="text"
          onChange={({ target }) => setBorn(target.value)}
        />
        <button type="submit">Update Author</button>
      </form>
    </>
  );
};
