import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage'
import Page404 from '../Page404/Page404'

//component that saves all path of the project and define the routing each path.
function Routing() {
  return (
    <Router>
    <Routes>
     <Route path="/" element={<HomePage/>} />
     <Route path="*" element={<Page404/>} />
    </Routes>
  </Router>
  );
};

export default Routing;
