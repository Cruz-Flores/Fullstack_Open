import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { NewBlogForm } from './NewBlogForm';

test('<NewBlogForm />', () => {
  const createBlog = jest.fn();

  const component = render(<NewBlogForm createBlog={createBlog} />);

  const input = component.container.querySelector('.title');
  const form = component.container.querySelector('form');

  fireEvent.change(input, {
    target: {
      value: 'form test',
    },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('form test');
});
