import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Notice from "../pages/Notice";
import Attendance from "../pages/Attendance";
import Mypage from "../pages/Mypage";
import StyleGuide from "../pages/StyleGuide";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Layout from "../layout/Layout";
import AddPost from "../pages/AddPost";
import PostDetail from "../pages/PostDetail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
        element: <AddPost />,
      },
      {
        path: "/post/:postId",
        element: <PostDetail />,
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
]);
export default router;
