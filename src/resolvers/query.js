const Query = {
  whiskies: async (parent, args, { models }) => {
    return await models.Whisky.find();
  },
  whisky: async (parent, { id }, { models }) => {
    return await models.Whisky.findById(id);
  },
};

module.exports = Query;
