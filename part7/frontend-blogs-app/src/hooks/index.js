import { useState } from 'react';
import {
  configNotification,
  deleteNotification,
} from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';

export const useField = (type, name) => {
  const [value, setValue] = useState('');
  const reset = () => {
    setValue('');
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const input = {
    name,
    type,
    value,
    onChange,
  };

  return [input, reset];
};

export const useNotification = () => {
  const dispatch = useDispatch();
  const notify = (message) => {
    dispatch(configNotification(message));
    setTimeout(() => {
      dispatch(deleteNotification(null));
    }, 2000);
  };

  return { notify };
};
