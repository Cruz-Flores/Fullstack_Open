import { useState, useEffect } from 'react';
import { Authors } from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useApolloClient, useSubscription } from '@apollo/client';
import { BOOK_ADDED, ALL_BOOKS } from './queries';

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${addedBook.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
  };

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('library-user-token');
    setToken(loggedUserToken);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <LoginForm
        setPage={setPage}
        setError={notify}
        setToken={setToken}
        show={page === 'login'}
      />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook setError={notify} show={page === 'add'} />
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

export default App;
