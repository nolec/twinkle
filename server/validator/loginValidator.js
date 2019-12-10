import validator from "validator";

const validate = user => {
  let error = {};

  if (!user.email) {
    error.email = "E-mail을 넣어주세요";
  } else if (!validator.isEmail(user.email)) {
    error.email = "이메일 형식이 잘 못 되었습니다.";
  }
  if (!user.password) {
    error.password = "비밀번호를 넣어주세요";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0
  };
};

export default validate;
