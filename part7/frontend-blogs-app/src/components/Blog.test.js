import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { Blog } from './Blog.js';

describe('<Blog />', () => {
  const blog = {
    title: 'blog test',
    author: 'coder',
    url: 'codes.com',
    likes: 5,
    user: {
      name: 'ganjah',
    },
  };

  const userLoged = {
    name: 'ganjah',
  };

  const likeEvent = jest.fn();

  let component;

  beforeEach(() => {
    component = render(
      <Blog addLikes={likeEvent} blog={blog} userLoged={userLoged} />
    );
  });

  test('at start the children are not displayed', () => {
    const divVisible = component.container.querySelector('.visibleAtTheStart');
    const divOnClick = component.container.querySelector('.visibleOnClick');

    expect(divVisible).toHaveStyle('display: block');
    expect(divOnClick).toHaveStyle('display: none ');
  });

  test('on click the second div its show', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    const div = component.container.querySelector('.visibleOnClick');
    expect(div).toHaveStyle('display: block');
  });

  test('two clicks return dos call to the function', () => {
    const likeButton = component.getByText('likes');

    for (let i = 0; i < 2; i++) {
      fireEvent.click(likeButton);
    }

    expect(likeEvent).toHaveBeenCalledTimes(2);
  });
});
