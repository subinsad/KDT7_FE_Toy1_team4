import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Notice from "../pages/Notice";
import Attendance from "../pages/Attendance";
import Mypage from "../pages/Mypage";
import StyleGuide from "../pages/StyleGuide";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import MainContent from "../pages/MainContent";
import FindPassword from "../pages/FindPassword";
import AttendanceBoardWrite from "../components/Board/ATtendanceBoardWrite";
import AttendanceBoardView from "../components/Board/AttendanceBoardView";
import EditMypage from "../pages/EditMypage";


 const router = createBrowserRouter([
   {
     path: "/",
     element: <Layout />,
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
        path: "attendance/write",
        element: <AttendanceBoardWrite />,
      },
      {
        path: "attendance/view",
        element: <AttendanceBoardView />,
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
        path: "editmypage",
        element: <EditMypage />,
      },
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