import "./Layout.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";

function Layout() {
  return (
    <div className="Layout">
      <header>
        <Header />
      </header>
      <aside>
        <Menu />
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
