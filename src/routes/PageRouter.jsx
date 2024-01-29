import React from "react";
import { Route, Routes, createBrowserRouter } from "react-router-dom";
import Notice from "../pages/Notice";
import Attendance from "../pages/Attendance";
import Mypage from "../pages/Mypage";
import MainContent from "../pages/MainContent";
import StyleGuide from "../pages/StyleGuide";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Layout from "../layout/Layout";

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

// const PageRouter = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<MainContent />} />
//       <Route path="/notice" element={<Notice />} />
//       <Route path="/attendance" element={<Attendance />} />
//       <Route path="/mypage" element={<Mypage />} />
//       <Route path="/styleguide" element={<StyleGuide />} />
//       <Route path="/login" element={<Login />} />
//     </Routes>
//   );
// };

// export default PageRouter;
export default router;
