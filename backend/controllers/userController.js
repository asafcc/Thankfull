const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/UserModel");

//Auth the user & get token
//POST /api/users/auth
//Private route
const authUser = asyncHandler(async (req, res) => {
  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  let user = req.user;
  const lastLogedIn = new Date(user.lastLogedIn);
  const today = new Date();

  if (!datesAreOnSameDay(today, lastLogedIn)) {
    user.quotesForToday = 5;
  }
  user.lastLogedIn = today;
  const updatedUser = await user.save();

  if (updatedUser) {
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      lastLogedIn: updatedUser.lastLogedIn,
      quotesForToday: updatedUser.quotesForToday,
    });
  } else {
    res.status(400);
    throw new Error("Oops!... Something Went Wrong :(");
  }
});

//Sign in & get token
//POST /api/users/login
//Public route
const login = asyncHandler(async (req, res) => {
  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const lastLogedIn = new Date(user.lastLogedIn);
    const today = new Date();
    user.lastLogedIn = today;

    if (!datesAreOnSameDay(today, lastLogedIn)) {
      user.quotesForToday = 5;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      lastLogedIn: updatedUser.lastLogedIn,
      quotesForToday: updatedUser.quotesForToday,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//Register a new user
//POST /api/users
//Public route
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const today = new Date();
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    lastLogedIn: today,
    quotesForToday: 5,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      lastLogedIn: user.lastLogedIn,
      quotesForToday: user.quotesForToday,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Get user profile
//GET /api/users/profile
//Private route
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Update user profile
//PUT /api/users/profile
//Private route
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,

      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  authUser,
  login,
  getUserProfile,
  registerUser,
  updateUserProfile,
};
