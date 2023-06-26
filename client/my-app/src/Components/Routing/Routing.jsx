import React from "react";
import Login from "../LoginPage/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Main from "../Main/Main";
import Registration from "../Registration/Registration";
import SavesRecipe from "../SavesRecipe/SavesRecipe";
import HomePage from "../HomePage/HomePage";

import Page404 from "../Page404/Page404";

//component that saves all path of the project and define the routing each path.
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="layout" element={<Layout />}>
          <Route path="main" element={<Main />} />
          <Route path="savesRecipe" element={<SavesRecipe />} />
          <Route path="search" element={<HomePage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default Routing;
