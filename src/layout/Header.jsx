import React from "react";
import Logo from "../components/Common/Logo";
import Gnb from "../components/Common/Gnb";
import Button from "../components/Common/Button";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Gnb />
      <Button className={"btn-logout"} />
    </header>
  );
};

export default Header;
