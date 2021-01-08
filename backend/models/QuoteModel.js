const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const quoteSchema = mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: true,
    },
  },
  { timestamp: true }
);

const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;
