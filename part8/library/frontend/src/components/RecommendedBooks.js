import { useQuery, useLazyQuery } from '@apollo/client';
import { ME } from '../queries';
import { useEffect } from 'react';
import { ALL_BOOKS } from '../queries';

export const RecommendedBooks = () => {
  const userData = useQuery(ME);
  const favoriteGenre =
    userData.data && userData.data.me ? userData.data.me.favoriteGenre : null;
  const [getBooksByGenre, { data }] = useLazyQuery(ALL_BOOKS, {
    variables: { genres: favoriteGenre },
  });

  const allBooks = data ? data.allBooks : [];

  useEffect(() => {
    if (userData.data && userData.data.me) {
      getBooksByGenre();
    }
  }, [userData.data]);

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {allBooks.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
