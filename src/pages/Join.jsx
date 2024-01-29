import React from "react";
import Block from "../components/Common/Block";
import Heading from "../components/Common/Heading";
import Text from "../components/Common/Text";
import Input from "../components/Form/Input";
import Button from "../components/Common/Button";
import { Link } from "react-router-dom";

const Join = () => {
  return (
    <div className="login__wrapper">
      <Block className="login">
        <Heading size={"regular"} tag={"h1"} text={"Join"} />
        <Text text={"회원가입을 하시려면 아래의 내용을 입력해주세요."} type={"type1"} />
        <form action="">
          <label htmlFor="name">Name</label>
          <Input width={"100%"} id="name" type="text" requerid />
          <label htmlFor="email">Email</label>
          <Input width={"100%"} id="email" type="email" requerid />
          <label htmlFor="password">Password</label>
          <Input width={"100%"} id="password" type="password" requerid />
          <Button className={"btn regular primary"} text="Join" />
        </form>
        <div className="join-wrap">
          <Text text={"계정이 있다면, 로그인을 해주세요."} type={"type2"} />
          <Link to="/login">
            <Button className={"btn regular success"} text="Login" />
          </Link>
        </div>
      </Block>
    </div>
  );
};

export default Join;
