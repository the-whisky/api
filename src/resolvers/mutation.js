require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-express');
const gravatar = require('../util/gravatar');

const Mutation = {
  newWhisky: async (parent, args, { models }) => {
    return await models.Whisky.create({
      name: args.name,
      country: args.country,
      alcohol: args.alcohol,
      volume: args.volume,
      price: args.price,
    });
  },
  deleteWhisky: async (parent, { id }, { models }) => {
    try {
      await models.Whisky.findByIdAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  updateWhisky: async (parent, { id, name, country, alcohol, volume, price }, { models }) => {
    return await models.Whisky.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          country,
          alcohol,
          volume,
          price,
        },
      },
      { new: true },
    );
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);
    const avatar = gravatar(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed
      });
      return await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw new Error('Error creating account');
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      email = email.trim().toLowerCase();
    }

    const user = await models.User.findOne({
      $or: [{ username }, { email }]
    });

    if (!user) {
      throw new AuthenticationError('Error signing in');
    }

    const valid = await bcrypt.compare(password, user.password,);

    if (!valid) {
      throw new ForbiddenError('Error signing in');
    }

    return await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};

module.exports = Mutation;
