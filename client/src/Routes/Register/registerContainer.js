import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../store/actions/authActions";
import RegisterPresenter from "./registerPresenter";

const useRegister = props => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {}
  });

  const handleSubmit = event => {
    event.preventDefault();
    let { name, email, password, confirmPassword } = inputs;
    props.register({
      name,
      email,
      password,
      confirmPassword
    });
  };
  const handleChange = event => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  return { ...inputs, handleChange, handleSubmit };
};

const RegisterContainer = props => {
  const validError = props.auth.error;
  const { handleChange, handleSubmit, ...inputs } = useRegister(props);
  return (
    <RegisterPresenter
      validError={validError}
      {...inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
const mapStateToProps = state => {
  console.log(state);
  return { auth: state.auth };
};

export default connect(mapStateToProps, { register })(RegisterContainer);
