const { Quote } = require("../../database/models");
const { User } = require("../../database/models");
const { createJWTToken } = require("../../utils/auth");

const resolvers = {
  Query: {
    allUsers: async () => {
      const users = await User.find();
      return users;
    },
    getUser: async (_root, { email, password }, _context, _info) => {
      let user = await User.findOne({ email, password }).select("+password");

      if (!user || password !== user.password) {
        throw new Error("Invalid credentials");
      }

      const token = createJWTToken(user);
      ({ password, ...userToReturn } = user.toJSON());

      return { token, user: userToReturn };
    },
    allQuotes: async (_, { verifiedUser }) => {
      const { _id: userId } = verifiedUser;
      const quotes = await Quote.find({ userId });
      return quotes;
    },
  },
  Mutation: {
    updateUser: async ({ _id, userInput }) => {
      if (!_id) {
        throw new Error("No id provided!");
      }
      const { name, address, email, password } = userInput;
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          name,
          address,
          email,
          password,
        },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("No user found!");
      }
      return {
        ...updatedUser.toJSON(),
        _id: updatedUser._id.toString(),
      };
    },
    deleteUser: async ({ id: _id }) => {
      const deletedUser = await User.findByIdAndDelete(_id);
      if (!deletedUser) {
        throw new Error(`No user with id ${_id} found!`);
      }
      return {
        ...deletedUser.toJSON(),
        _id: deletedUser._id.toString(),
      };
    },
    createQuote: async ({ quoteInput }, { verifiedUser }) => {
      const { quote, author, year } = quoteInput;
      const newQuote = new Quote({
        quote,
        author,
        year,
        userId: verifiedUser._id,
      });

      return await newQuote.save();
    },
    updateQuote: async ({ _id, quoteInput }, { verifiedUser }) => {
      if (!verifiedUser) throw new Error("Unauthorized");

      const { _id: userId } = verifiedUser;
      const { quote, author, year } = quoteInput;

      const updatedQuote = await Quote.findOneAndUpdate(
        { _id, userId },
        {
          quote,
          author,
          year,
        },
        { new: true }
      );
      if (!updatedQuote) {
        throw new Error("No quote found!");
      }
      return updatedQuote;
    },
    deleteQuote: async ({ id: _id }, { verifiedUser }) => {
      if (!verifiedUser) throw new Error("Unauthorized");
      const { _id: userId } = verifiedUser;

      const deletedQuote = await Quote.findOneAndDelete({ _id, userId });
      if (!deletedQuote) {
        throw new Error(`Invalid deleted!`);
      }
      return deletedQuote;
    },
  },
};

module.exports = resolvers;
