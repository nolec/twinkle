import React, { useState, useEffect } from "react";
import LoginPresenter from "./LoginPresenter";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/actions/authActions";

const useLogin = props => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    errors: {}
  });
  const Selector = useSelector(state => state);
  const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();
    let { email, password } = inputs;
    dispatch(
      login(
        {
          email,
          password
        },
        props.history
      )
    );
  };
  const handleChange = event => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const authError = Error => {
    if (Error && Object.keys(Error).length > 0) {
      setInputs({ ...inputs, errors: Error });
    }
  };
  useEffect(() => {
    authError(Selector.auth.error);
  }, [Selector.auth]);
  return { ...inputs, handleChange, handleSubmit };
};

const LoginContainer = props => {
  const { handleChange, handleSubmit, ...inputs } = useLogin(props);
  return (
    <LoginPresenter
      {...inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginContainer;
