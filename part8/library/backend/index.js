const {
  ApolloServer,
  gql,
  AuthenticationError,
  UserInputError,
} = require('apollo-server');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

const mongoose = require('mongoose');
const Book = require('./models/book.js');
const Author = require('./models/author.js');
const User = require('./models/users.js');

const MONGODB_URI =
  'mongodb+srv://phonebook:phonebook@cluster0.yluj9.mongodb.net/library-app-graphql?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to mMongoDB:', error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    createUser(username: String!, favoriteGenre: String): User
    login(username: String!, password: String!): Token
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
  }
`;

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },

    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      const author =
        args.author && (await Author.findOne({ name: args.author }));

      if (author) {
        const booksByAuthor = await Book.find({
          author: { $in: author._id },
        }).populate('author', {
          name: 1,
          born: 1,
          bookCount: 1,
          id: 1,
        });

        if (args.genres) {
          const booksByGenreAndAuthor = booksByAuthor.filter((b) =>
            b.genres.includes(args.genres)
          );
          return booksByGenreAndAuthor;
        }

        return booksByAuthor;
      } else if (!author && args.genres) {
        const booksByGenre = await Book.find({
          genres: { $in: args.genres },
        }).populate('author', {
          name: 1,
          born: 1,
          bookCount: 1,
          id: 1,
        });

        return booksByGenre;
      }

      const books = await Book.find({}).populate('author', {
        name: 1,
        born: 1,
        bookCount: 1,
        id: 1,
      });

      return books;
    },

    allAuthors: async () => Author.find({}),
  },

  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      const bookCount = await Book.find({ author: { $in: author._id } });
      return bookCount.length;
    },
  },

  Mutation: {
    createUser: (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secred') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },

    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const author = await Author.findOne({ name: args.author });
      const authorIsSaved = author ? true : false;

      let idOfAuthor;

      if (!authorIsSaved) {
        const newAuthor = new Author({
          name: args.author,
        });

        try {
          await newAuthor.save();
          idOfAuthor = newAuthor._id;
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      } else if (authorIsSaved) {
        idOfAuthor = author._id;
      }

      const book = new Book({ ...args, author: idOfAuthor });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return book.populate('author', {
        name: 1,
        born: 1,
        bookCount: 1,
        id: 1,
      });
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.born;
      return author.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// if (author && !args.genre) {
//   const booksByAuthor = await Book.find({ author: { $in: author._id } });
//   return booksByAuthor;
// } else if (!author && args.genre) {
//   const booksByGenre = await Book.find({ genre: { $in: args.genre } });
//   return booksByGenre;
// } else if (author && args.genre) {
//   const booksByAuthor = await Book.find({ author: { $in: author._id } });
//   const booksByGenreAndAuthor = booksByAuthor.filter((b) =>
//     b.genres.includes(args.genre)
//   );
//   return booksByGenreAndAuthor;
// }
