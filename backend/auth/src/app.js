const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const userRouter = require("./routes/route");
const userProfileRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const JWT = require("jsonwebtoken");

// dotenv
require("dotenv").config();
const PORT = process.env.PORT || 3000;
//swagger setting
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
    components:{
      securitySchemes:{
        BearerAuth:{
          type:"http",
          scheme:"bearer",
          bearerFormat: JWT,
          in: "header"
        }
      }
    },
    security:[{
      bearerAuth:[]
    }],
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: [__dirname.replaceAll("\\","/") + "/routes/*.js"],
};
const specs = swaggerJsDoc(options);
const app = express();
// connect to mongodb
const connect = require("./database/db");
connect();
app.set("trust proxy", 1);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(
  cors({
    origin: ["http://localhost:3006", "http://localhost:3007"],
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

// routes
app.use("/v1/api/auth", userRouter);
app.use("/api/user", userProfileRouter);
app.use("/api/admin", adminRouter);
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
  res.status(500).json({ message: err });
});

app.listen(PORT, () => {
  console.log(`>>> App listening on port ${PORT}`);
});

module.exports = app;
