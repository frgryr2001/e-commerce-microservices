const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const cors = require("cors");
// dotenv
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();
// connect to mongodb
const connect = require("./database/db");
connect();
app.set("trust proxy", 1);
app.use(
	cors({
	  origin: "http://localhost:5173",
	  credentials: true,
	})
 );
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "none",
    },
  })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
 });


 // 500 error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
 
	// render the error page
	res.status(err.status || 500);
	res.status(500).json({message: err});
});

app.listen(PORT, () => {
	console.log(`>>> App listening on port ${PORT}`);
 });
 
 module.exports = app;