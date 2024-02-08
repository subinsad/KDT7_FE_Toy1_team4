import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import { auth } from "../firebase";

const Layout = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  if (!user) {
    return navigate("/login");
  }

  return (
    <>
      <div className="containers">
        <Header />
        <Main>
          <Outlet />
        </Main>
      </div>
    </>
  );
};

export default Layout;
