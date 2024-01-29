import React from "react";
import Block from "../components/Common/Block";
import Heading from "../components/Common/Heading";
import Text from "../components/Common/Text";
import Input from "../components/Form/Input";
import Button from "../components/Common/Button";
import "./Login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login__wrapper">
      <Block className="login">
        <Heading size={"regular"} tag={"h1"} text={"Login"} />
        <Text text={"로그인을 하시려면 이메일과 비밀번호를 입력하세요."} type={"type1"} />
        <form action="">
          <label htmlFor="email">Email</label>
          <Input width={"100%"} id="email" type="email" requerid />
          <label htmlFor="password">Password</label>
          <Input width={"100%"} id="password" type="password" requerid />
          <Button className={"btn regular primary"} text="Login" />
        </form>
        <div className="join-wrap">
          <Text text={"계정이 없으시다면 회원가입을 해주세요."} type={"type2"} />
          <Link to="/join">
            <Button className={"btn regular success"} text="Join" />
          </Link>
        </div>
      </Block>
    </div>
  );
};

export default Login;
