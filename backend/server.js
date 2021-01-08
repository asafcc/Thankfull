const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const quoteRoutes = require("./routes/quoteRoutes");
const userRoutes = require("./routes/userRoutes");

//environment variables
dotenv.config();

//connect to DB
connectDB();

const app = express();

//middleware to accept json data
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/quotes", quoteRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("running");
  });
}

//middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
