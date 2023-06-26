import "./Header.css";
import React from "react";
import Logo from "../Logo/Logo";

//function that call to Logo component and define the project name.
function Header() {
  return (
    <div className="Header">
      <Logo />
      <h1 id="my-h1-header">AllerChef</h1>
    </div>
  );
}

export default Header;
