import React, { useState } from 'react';

const Blog = ({ blog, addLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const butonText = visible ? 'hide' : 'view';

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>{butonText}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br /> likes {blog.likes}
        <button onClick={addLikes}>likes</button> <br /> {blog.user.name} <br />
        <button onClick={deleteBlog}>remove</button>
      </div>
    </div>
  );
};

export { Blog };
