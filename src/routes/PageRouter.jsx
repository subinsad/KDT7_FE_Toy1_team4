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
import MainContent from "../pages/MainContent";
import AddPost from "../pages/AddPost";
import PostDetail from "../pages/PostDetail";
=======
>>>>>>> origin/develop
import ProtectedRoute from "./ProtectedRoute";
import FindPassword from "../pages/FindPassword";
<<<<<<< HEAD
import PostUpdate from '../components/PostComponents/PostUpdate';


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
=======
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
>>>>>>> origin/develop
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
<<<<<<< HEAD
        path: "/notice/AddPost",
        element: <AddPost />
      },
      {
        path: "/posts/:postId",
        element: <PostDetail />,
      },
      {
        path: "/posts/:postId/PostUpdate",
        element: <PostUpdate />,
      },

=======
        path: "editmypage",
        element: <EditMypage />,
      },
>>>>>>> origin/develop
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