const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const Book = require('./models/book.js');
const Author = require('./models/author.js');
const User = require('./models/user.js');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

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

      pubsub.publish('BOOK_ADDED', {
        bookAdded: book.populate('author', {
          name: 1,
          born: 1,
          bookCount: 1,
          id: 1,
        }),
      });

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

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

module.exports = resolvers;
