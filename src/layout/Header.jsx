import React from "react";
import Logo from "../components/Logo";
import Gnb from "../components/Gnb";
import "./Header.scss";
import Button from "../components/Button";

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
