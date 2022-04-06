import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
    genres
    id
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

export const ALL_BOOKS = gql`
  query allThebooks($genres: String) {
    allBooks(genres: $genres) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const EDIT_BORN_AUTHOR = gql`
  mutation editBornAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
