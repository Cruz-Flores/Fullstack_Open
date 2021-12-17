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
    <>
      <h2>Create new</h2>
      <form onSubmit={addBLog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            className="title"
            value={newBlog.title}
            type="text"
            name="title"
            onChange={handleNewBlogChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            value={newBlog.author}
            type="text"
            name="author"
            onChange={handleNewBlogChange}
          />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input
            value={newBlog.url}
            type="text"
            name="url"
            onChange={handleNewBlogChange}
          />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  );
};

export { NewBlogForm };
