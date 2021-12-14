const NewBlogForm = ({ onSubmit, onChange, newBlog }) => {
  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            value={newBlog.title}
            type="text"
            name="title"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            value={newBlog.author}
            type="text"
            name="author"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input
            value={newBlog.url}
            type="text"
            name="url"
            onChange={onChange}
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
