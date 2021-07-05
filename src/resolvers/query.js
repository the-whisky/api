const Query = {
  whiskies: async (parent, args, { models }) => {
    return await models.Whisky.find();
  },
  whisky: async (parent, args, { models }) => {
    return await models.Whisky.findById(args.id);
  },
};

module.exports = Query;
