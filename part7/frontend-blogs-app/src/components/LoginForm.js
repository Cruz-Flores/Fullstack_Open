import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { initializeCurrentUser } from '../reducers/currentUserReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, resetUsername] = useField('text', 'username');
  const [password, resetPassword] = useField('password', 'password');

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      initializeCurrentUser({
        username: username.value,
        password: password.value,
      })
    );
    resetUsername();
    resetPassword();
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input {...username} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input {...password} />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export { LoginForm };
