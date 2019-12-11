import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const Selector = useSelector(state => state);
  const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();
    let { name, email, password, confirmPassword } = inputs;
    dispatch(
      register(
        {
          name,
          email,
          password,
          confirmPassword
        },
        props.history
      )
    );
    authError();
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

const RegisterContainer = props => {
  const { handleChange, handleSubmit, ...inputs } = useRegister(props);
  return (
    <RegisterPresenter
      {...inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default RegisterContainer;
