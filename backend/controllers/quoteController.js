const asyncHandler = require("express-async-handler");
const Quote = require("../models/QuoteModel");
const User = require("../models/UserModel");

//Fetch all quotes
//GET /api/quotes
//Public route
const getQuotes = asyncHandler(async (req, res) => {
  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const quotes = await Quote.find({ isPrivate: false });
  res.json(shuffle(quotes));
});

//Saves new quote in DB
//GET /api/quotes
//Private route
const saveQuote = asyncHandler(async (req, res) => {
  const { createdBy, text, isPrivate } = req.body;

  // const user = await User.findById(req.user._id).select("-password");
  const user = req.user;
  user.quotesForToday -= 1;
  const updatedUser = await user.save();

  const quote = await Quote.create({
    createdBy,
    text,
    isPrivate,
  });

  const toSendBack = { quote, userDetails: updatedUser };

  if (quote) {
    res.status(201).json(toSendBack);
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

module.exports = { getQuotes, saveQuote };
