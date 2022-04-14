import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, deleteBlog } from '../reducers/blogReducer';
import { useField } from '../hooks/index';
import { addComment } from '../reducers/blogReducer';

const Blog = () => {
  const id = useParams().id;
  const { currentUser, blogs } = useSelector((state) => state);
  const individualBlog = blogs.find((b) => b.id === id);
  const [comment, resetComment] = useField('text', 'comment');
  const dispatch = useDispatch();

  const onLikesButtonClick = async () => {
    dispatch(addLike(individualBlog));
  };

  const onDeleteButtonClick = async () => {
    dispatch(deleteBlog(individualBlog.id));
  };

  const onSubmitComment = (e) => {
    e.preventDefault();
    const commentedBlog = {
      ...individualBlog,
      comments: individualBlog.comments.concat(comment.value),
    };
    dispatch(addComment(commentedBlog));
    resetComment();
  };

  return (
    <>
      {individualBlog && (
        <>
          <div>
            <h2>
              {individualBlog.title} - {individualBlog.author}
            </h2>
          </div>
          <a href={individualBlog.url}>{individualBlog.url}</a>
          <div>
            {individualBlog.likes}
            <button onClick={onLikesButtonClick}>like</button>
          </div>
          added by {individualBlog.user.name}
          {individualBlog.user.name === currentUser.name && (
            <button onClick={onDeleteButtonClick}>remove</button>
          )}
          <h3>comments</h3>
          <form onSubmit={onSubmitComment}>
            <input {...comment} />
            <button type="submit">add comment</button>
          </form>
          <ul>
            {/* {individualBlog.comments.map((c) => (
              <li>{c.content}</li>
            ))} */}
          </ul>
        </>
      )}
    </>
  );
};

export { Blog };
