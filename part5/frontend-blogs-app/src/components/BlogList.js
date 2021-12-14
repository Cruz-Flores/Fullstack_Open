import Blog from './Blog.js';

const BlogList = ({ blogs }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};
export { BlogList };
