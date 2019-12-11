import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../store/actions/authActions";

const HeaderH = styled.header``;
const ListSection = styled.section`
  display: flex;
  font-size: 22px;
`;
const IntroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 18px;
`;
const IntroText = styled.p`
  font-family: "Permanent Marker", cursive;
`;
const AuthBox = styled.div`
  position: absolute;
  right: 76px;
  a {
    all: unset;
    cursor: pointer;
    font-size: 15px;
    margin-right: 5px;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    padding: 1px;
  }
`;
const LoginBtn = styled(Link)``;
const LogoutBtn = styled.button`
  all: unset;
`;
const JoinBtn = styled(Link)``;

const List = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
`;
const Item = styled.li`
  width: 80px;
  height: 50px;
  ${props =>
    props.current
      ? { backgroundColor: "#2a1a5e", color: "#fff" }
      : "transparent"}
`;
const Slink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const Header = props => {
  const Selector = useSelector(state => state);
  const dispatch = useDispatch();
  console.log(Selector);
  return (
    <HeaderH>
      <IntroSection>
        <IntroText>Show Me Your Talent</IntroText>
        <AuthBox>
          {console.log(props)}
          {Selector && Selector.auth.isAuthenticated ? (
            <LogoutBtn
              onClick={() => {
                dispatch(logout(props.history));
              }}
            >
              로그아웃
            </LogoutBtn>
          ) : (
            <>
              <LoginBtn to="/login">로그인</LoginBtn>
              <JoinBtn to="/register">회원가입</JoinBtn>
            </>
          )}
        </AuthBox>
      </IntroSection>
      <ListSection>
        <List>
          <Item current={props.location.pathname === "/"}>
            <Slink to="/">자랑툰</Slink>
          </Item>
          <Item>
            <Slink to="/">커밍쑨</Slink>
          </Item>
          <Item>
            <Slink to="/">커밍쑨</Slink>
          </Item>
        </List>
      </ListSection>
    </HeaderH>
  );
};
export default withRouter(Header);
