import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addLike, deleteBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const visibilityButonText = visible ? 'hide' : 'view';

  const onLikesButtonClick = async () => {
    dispatch(addLike(blog));
  };

  const onDeleteButtonClick = async () => {
    dispatch(deleteBlog(blog.id));
  };

  return (
    <div>
      <div>
        <h2>{blog.id}</h2>
        <p>
          {blog.title} - {blog.author}
        </p>
        <button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {visibilityButonText}
        </button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
        <button onClick={onLikesButtonClick}>like</button>
        <p>{blog.user.name}</p>
        {blog.user.name === user.name && (
          <button onClick={onDeleteButtonClick}>remove</button>
        )}
      </div>
    </div>
  );
};

export { Blog };
