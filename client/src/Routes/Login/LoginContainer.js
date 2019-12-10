import React, { useState } from "react";
import LoginPresenter from "./LoginPresenter";

const useLogin = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    errors: {}
  });
  const handleSubmit = event => {
    event.preventDefault();
  };
  const handleChange = event => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  return { ...inputs, handleChange, handleSubmit };
};

const LoginContainer = () => {
  const { handleChange, handleSubmit, ...inputs } = useLogin();
  return (
    <LoginPresenter
      {...inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
export default LoginContainer;
