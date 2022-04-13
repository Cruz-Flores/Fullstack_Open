import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const NewBlogForm = () => {
  const dispatch = useDispatch();
  const [title, resetTitle] = useField('text', 'title');
  const [author, resetAuthor] = useField('text', 'author');
  const [url, resetUrl] = useField('text', 'url');

  const addBLog = async (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
    );
    resetAuthor();
    resetTitle();
    resetUrl();
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBLog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input {...title} />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input {...author} />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input {...url} />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export { NewBlogForm };
