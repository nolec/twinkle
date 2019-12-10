import registerValidator from "../validator/registerValidator";
import loginValidator from "../validator/loginValidator";
import User from "../models/User";
import bcrypt from "bcryptjs";
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
              password: hash
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
