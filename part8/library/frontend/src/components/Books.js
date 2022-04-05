import { ALL_BOOKS, ME } from '../queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { RecommendedBooks } from './RecommendedBooks';

const Books = (props) => {
  const { show } = props;
  const { data } = useQuery(ALL_BOOKS);
  const books = data ? data.allBooks : [];
  //if a user is not logged in, a query should not be executed
  const [filter, setFilter] = useState(null);

  const filteredBooks = filter
    ? books.filter((b) => b.genres.includes(filter))
    : null;

  const booksToShow = filter ? filteredBooks : books;

  let genres = [];

  books.map((b) =>
    b.genres.forEach((g) => {
      if (!genres.includes(g)) {
        genres = genres.concat(g);
      }
    })
  );

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      {filter && <p>filter aplied: {filter}</p>}
      {filter === 'recommend' ? (
        <RecommendedBooks />
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksToShow.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {genres.map((g) => (
        <button key={g} onClick={() => setFilter(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setFilter('recommend')}>recommend</button>
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  );
};

export default Books;

//solution to 8.17-8.20
// import { ALL_BOOKS, ME } from '../queries';
// import { useQuery } from '@apollo/client';
// import { useState, useEffect } from 'react';

// const Books = (props) => {
//   const { show } = props;

//   const { data } = useQuery(ALL_BOOKS);
//   const books = data ? data.allBooks : [];
//   //if a user is not logged in, a query should not be executed
//   const userData = useQuery(ME);
//   const [filter, setFilter] = useState(null);

//   useEffect(() => {
//     if (userData.data && userData.data.me) {
//       setFilter(userData.data.me.favoriteGenre);
//     }
//   }, [userData.data]);

//   const filteredBooks = filter
//     ? books.filter((b) => b.genres.includes(filter))
//     : null;

//   const booksToShow = filter ? filteredBooks : books;

//   let genres = [];

//   books.map((b) =>
//     b.genres.forEach((g) => {
//       if (!genres.includes(g)) {
//         genres = genres.concat(g);
//       }
//     })
//   );

//   if (!show) {
//     return null;
//   }

//   return (
//     <div>
//       <h2>books</h2>
//       {filter && <p>filter aplied: {filter}</p>}
//       <table>
//         <tbody>
//           <tr>
//             <th></th>
//             <th>author</th>
//             <th>published</th>
//           </tr>
//           {booksToShow.map((a) => (
//             <tr key={a.title}>
//               <td>{a.title}</td>
//               <td>{a.author.name}</td>
//               <td>{a.published}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {genres.map((g) => (
//         <button key={g} onClick={() => setFilter(g)}>
//           {g}
//         </button>
//       ))}
//       <button onClick={() => setFilter(null)}>all genres</button>
//     </div>
//   );
// };

// export default Books;
