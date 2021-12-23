import React, { useState } from 'react';

const NewBlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleNewBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value,
    });
  };

  const addBLog = (event) => {
    event.preventDefault();

    createBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <div id="newBlogDiv">
      <h2>Create new</h2>
      <form id="newBlogForm" className="form" onSubmit={addBLog}>
        <div className="divInput">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            className="title"
            value={newBlog.title}
            type="text"
            name="title"
            onChange={handleNewBlogChange}
          />
        </div>
        <div className="divInput">
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            value={newBlog.author}
            type="text"
            name="author"
            onChange={handleNewBlogChange}
          />
        </div>
        <div className="divInput">
          <label htmlFor="url">Url:</label>
          <input
            id="url"
            value={newBlog.url}
            type="text"
            name="url"
            onChange={handleNewBlogChange}
          />
        </div>
        <div className="divNewBlogInput">
          <button id="createBlogButton" className="greenButton" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export { NewBlogForm };
