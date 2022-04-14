import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const IndividualUser = () => {
  const id = useParams().id;
  const { users } = useSelector((state) => state);
  const individualUser = users.find((u) => u.id === id);

  return (
    <div>
      {individualUser && (
        <>
          <h2>{individualUser.name}</h2>
          <h3>added blogs</h3>
          <ul>
            {individualUser.blogs.map((b) => (
              <li key={b.id}>{b.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
