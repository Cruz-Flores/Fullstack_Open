import { useField } from '../hooks/index.js';
import { usersService } from '../services/users.js';
import { useDispatch } from 'react-redux';
import { initializeCurrentUser } from '../reducers/currentUserReducer.js';
import { useNotification } from '../hooks/index.js';

const RegistryForm = () => {
  const dispatch = useDispatch();
  const { notify } = useNotification();
  const [name, resetName] = useField('text', 'name');
  const [username, resetUsername] = useField('text', 'username');
  const [password, resetPassword] = useField('password', 'password');

  const addNewUser = async (event) => {
    event.preventDefault();

    const newUser = {
      name: name.value,
      username: username.value,
      password: password.value,
    };

    try {
      await usersService.create(newUser);
      dispatch(
        initializeCurrentUser({
          username: username.value,
          password: password.value,
        })
      );
      notify(`${newUser.name}, registry succesfuly`, 'succes');
    } catch (exception) {
      notify('Wrong credentials', 'error');
    }

    resetName();
    resetUsername();
    resetPassword();
  };

  return (
    <form onSubmit={addNewUser}>
      <div>
        <label htmlFor="name">Name:</label>
        <input {...name} />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input {...username} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input {...password} />
      </div>
      <button>Registry</button>
    </form>
  );
};

export { RegistryForm };
