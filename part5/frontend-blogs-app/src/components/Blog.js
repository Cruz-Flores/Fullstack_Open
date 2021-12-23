import React, { useState } from 'react';

const Blog = ({ blog, addLikes, deleteBlog, userLoged }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const butonText = visible ? 'hide' : 'view';

  return (
    <div id="blogDiv" className="blogDiv">
      <div id="titleDiv">
        <p>
          {blog.title} - {blog.author}
        </p>

        <button className="greenButton" onClick={toggleVisibility}>
          {butonText}
        </button>
      </div>
      <div id="showWhenVisible" style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
        <button className="blueButton" onClick={addLikes}>
          like
        </button>
        <p>{blog.user.name}</p>
        {blog.user.name === userLoged.name && (
          <button className="redButton" onClick={deleteBlog}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export { Blog };
