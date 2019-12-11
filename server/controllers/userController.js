import registerValidator from "../validator/registerValidator";
import loginValidator from "../validator/loginValidator";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serverError, resourceError } from "../utils/error";

export const login = (req, res) => {
  let { email, password } = req.body;
  let validate = loginValidator({ email, password });
  if (!validate.isValid) {
    res.status(400).json(validate.error);
  }
  User.findOne({ email })
    .then(user => {
      if (!user) {
        resourceError(res, "유저를 찾을 수 없습니다.");
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return serverError(res, err);
        }
        if (!result) {
          return resourceError(res, "패스워드가 틀렸습니다.");
        }
        let token = jwt.sign(
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            amount: user.amount,
            income: user.income,
            expense: user.expense,
            transactions: user.transactions
          },
          "secret",
          { expiresIn: "2h" }
        );
        res.status(200).json({
          message: "로그인 성공",
          token: `Bearer ${token}`
        });
      });
    })
    .catch(error => serverError(res, error, ""));
};

export const register = (req, res) => {
  let { name, email, password, confirmPassword } = req.body;
  let validate = registerValidator({ name, email, password, confirmPassword });
  if (!validate.isValid) {
    res.status(400).json(validate.error);
  } else {
    User.findOne({ email })
      .then(user => {
        if (user) {
          resourceError(res, "이미 등록된 이메일입니다.");
        }
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return serverError(res, null, "Server Error in Salt");
          }
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              return serverError(res, null, "Server Error in Bcrypt");
            }
            let newUser = new User({
              name,
              email,
              password: hash,
              balance: 0,
              expense: 0,
              income: 0,
              transactions: []
            });
            newUser
              .save()
              .then(user => {
                res.status(201).json({
                  message: "등록이 완료되었습니다."
                });
              })
              .catch(error =>
                serverError(res, error, "Server Error in Saving")
              );
          });
        });
      })
      .catch(error => serverError(res, error, "Server Error"));
  }
};
