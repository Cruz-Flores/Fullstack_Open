import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Togglable } from './Togglable';
import { NewBlogForm } from './NewBlogForm';

export const Blogs = () => {
  const { blogs } = useSelector((state) => state);

  return (
    <>
      <Togglable buttonLabel="create">
        <NewBlogForm />
      </Togglable>
      <ul>
        {blogs.length > 0 &&
          blogs.map((b) => (
            <li key={b.id}>
              <Link to={`blogs/${b.id}`}>{b.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};
