import validator from "validator";

const validate = user => {
  let error = {};

  if (!user.name) {
    error.name = "이름을 넣어주세요";
  }
  if (!user.email) {
    error.email = "E-mail을 넣어주세요";
  } else if (!validator.isEmail(user.email)) {
    error.email = "이메일 형식이 잘 못 되었습니다.";
  }
  if (!user.password) {
    error.password = "비밀번호를 넣어주세요";
  } else if (user.password < 6) {
    error.password = "적어도 6자리 이상의 비밀번호가 필요합니다.";
  }
  if (!user.confirmPassword) {
    error.confirmPassword = "비밀번호를 확인해주세요";
  } else if (user.password !== user.confirmPassword) {
    error.confirmPassword = "비밀번호가 틀립니다.";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0
  };
};

export default validate;
