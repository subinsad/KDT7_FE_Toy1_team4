import React from "react";
import { Route, Routes } from "react-router-dom";
import Notice from "../pages/Notice";
import Attendance from "../pages/Attendance";
import Mypage from "../pages/Mypage";
import MainContent from "../pages/MainContent";
import StyleGuide from "../pages/StyleGuide";

const PageRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/notice" element={<Notice />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/styleguide" element={<StyleGuide />} />
    </Routes>
  );
};

export default PageRouter;
