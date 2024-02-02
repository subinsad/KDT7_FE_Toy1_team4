import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Notice from "../pages/Notice";
import Attendance from "../pages/Attendance";
import Mypage from "../pages/Mypage";
import StyleGuide from "../pages/StyleGuide";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Layout from "../layout/Layout";
<<<<<<< HEAD
import ProtectedRoute from "./ProtectedRoute";
import MainContent from "../pages/MainContent";
import FindPassword from "../pages/FindPassword";
=======
import AddPost from "../pages/AddPost";
import PostDetail from "../pages/PostDetail";
import ProtectedRoute from "../components/PostComponents/protected-route";
import LoginTest from "../components/PostComponents/logintest";

>>>>>>> feature/board

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "main",
        element: <MainContent />,
      },
      {
        path: "notice",
        element: <Notice />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "mypage",
        element: <Mypage />,
      },
      {
        path: "styleguide",
        element: <StyleGuide />,
      },
      {
        path: "/AddPost",
        element:
          <ProtectedRoute>
            <AddPost />
          </ProtectedRoute>
        ,
      },
      {
        path: "/posts/:userId",
        element: <PostDetail />,
      },
      {
        path: "/logintest",
        element: <LoginTest />
      }

    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/findpassword",
    element: <FindPassword />,
  },
]);
export default router;
