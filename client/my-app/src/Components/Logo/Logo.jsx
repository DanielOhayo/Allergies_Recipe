import "./Logo.css";
import logoImage from "../Assets/Logo.png";

//component that load the logo of project.
function Logo() {
  return (
    <div className="Logo">
      <img src={logoImage} alt="Logo" />
    </div>
  );
}

export default Logo;
