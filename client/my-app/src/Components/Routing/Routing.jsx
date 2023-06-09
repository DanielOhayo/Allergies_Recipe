import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Login from "../LoginPage/LoginPage";
import Page404 from "../Page404/Page404";
import Registration from "../Registration/Registration";

//component that saves all path of the project and define the routing each path.
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="homePage" element={<HomePage />} />
        <Route path="registration" element={<Registration />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default Routing;
