import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import key from "./config/key";
// ----------------------------

import "./db";
const app = express();
// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: ["sdfsdafsafsaf"]
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//====================================================
import userRouter from "./routers/userRouter";
app.use("/api/users", userRouter);
//====================================================
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
