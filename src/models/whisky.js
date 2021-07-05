const mongoose = require('mongoose');

const whiskySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    alcohol: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Whisky = mongoose.model('Whisky', whiskySchema);

module.exports = Whisky;
