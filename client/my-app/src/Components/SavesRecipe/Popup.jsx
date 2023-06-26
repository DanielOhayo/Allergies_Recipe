import React from "react";
import "./Popup.css";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div id="popup-inner">{props.children}</div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
