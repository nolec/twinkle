import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px;
  background-color: #f2f2f2;
  min-height: 100vh;
  display: flex;
`;

const JoinBox = styled.div`
  width: 400px;
  position: relative;
  background-color: #fff;
  margin: auto;
  border-radius: 10px;
  padding: 40px 55px 33px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
`;
const Hbox = styled.div`
  width: 100%;
  height: 10vh;
  padding: 10px 35px;
`;
const Hlink = styled(Link)`
  width: 100%;
  height: 100%;
  font-size: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 10px;
`;
const Form = styled.form`
  > div {
    width: 100%;
    border-bottom: 2px solid #adadad;
    margin-bottom: 37px;
  }
  * {
    all: unset;
    font-size: 15px;
    color: #555;
    line-height: 1.2;
    display: block;
    width: 100%;
    height: 45px;
    background: 0 0;
  }
`;
const Name = styled.input``;
const Password = styled.input``;
const Email = styled.input``;
const Submit = styled.input``;

const Feedback = styled.div`
  display: flex !important;
  align-items: center;
`;
const RegisterPresenter = ({ handleSubmit, handleChange, ...inputs }) => {
  return (
    <Container>
      {console.log(inputs.errors)}
      <JoinBox>
        <Hbox>
          <Hlink to="/">SELF</Hlink>
        </Hbox>
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <Name
              className={
                inputs.errors.name ? "form-control is-invalid" : "form-control"
              }
              type="text"
              name="name"
              placeholder="NAME"
              id="name"
              onChange={handleChange}
            />
            {inputs.errors.name && (
              <Feedback className="invalid-feedback">
                {inputs.errors.name}
              </Feedback>
            )}
          </div>
          <div>
            <Email
              className={
                inputs.errors.email ? "form-control is-invalid" : "form-control"
              }
              type="email"
              name="email"
              placeholder="E-mail"
              id="email"
              onChange={handleChange}
            />
            {inputs.errors.email && (
              <Feedback className="invalid-feedback">
                {inputs.errors.email}
              </Feedback>
            )}
          </div>
          <div>
            <Password
              className={
                inputs.errors.password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="password"
              name="password"
              placeholder="PASSWORD"
              id="password"
              onChange={handleChange}
            />
            {inputs.errors.password && (
              <Feedback className="invalid-feedback">
                {inputs.errors.password}
              </Feedback>
            )}
          </div>
          <div>
            <Password
              className={
                inputs.errors.confirmPassword
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="password"
              name="confirmPassword"
              placeholder="PASSWORD_CONFIRMATION"
              id="confirmPassword"
              onChange={handleChange}
            />
            {inputs.errors.confirmPassword && (
              <Feedback className="invalid-feedback">
                {inputs.errors.confirmPassword}
              </Feedback>
            )}
          </div>

          <Submit type="submit" value="등록" onClick={handleSubmit} />
        </Form>
      </JoinBox>
    </Container>
  );
};

export default RegisterPresenter;
