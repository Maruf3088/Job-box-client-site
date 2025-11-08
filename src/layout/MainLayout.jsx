import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../components/Navber";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navber></Navber>
      <div className="pt-[90px]">
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;
