import { ALL_AUTHORS } from '../queries';
import { useQuery } from '@apollo/client';

const Authors = (props) => {
  const { show } = props;

  const allAuthors = useQuery(ALL_AUTHORS);
  const authors = allAuthors.data ? allAuthors.data.allAuthors : [];

  console.log('render authors');

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Authors };
