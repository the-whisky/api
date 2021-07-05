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
};

module.exports = Mutation;
