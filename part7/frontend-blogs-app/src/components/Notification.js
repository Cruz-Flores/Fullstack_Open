// const Notification = ({ notification }) => {
//   if (notification === null) {
//     return null;
//   }

//   return <div className={notification.type}>{notification.message}</div>;
// };

// export { Notification };

import { useSelector } from 'react-redux';

const Notification = () => {
  const { notification } = useSelector((state) => state);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (notification === null) {
    return null;
  }
  return <div style={style}>{notification}</div>;
};

export { Notification };
