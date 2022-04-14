import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';
import { Link } from 'react-router-dom';

export const Users = () => {
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  return (
    <div>
      <h2>users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((u) => (
            <tr key={u.name}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
