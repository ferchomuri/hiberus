import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../bridges/Auth";
import Button from "../Button/Button";
import "./Navbar.css";
import { showNotification } from "../Notification/Notification";

interface NavbarProps {
  logo: string;
  name: string;
  loggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ logo, name, loggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    showNotification({ message: "Cierre de sesión exitoso", type: "success" });
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <Link to='/' className='logo'>
          <img src={logo} alt='Logo' />
          <p>{name}</p>
        </Link>
        <Button
          text={loggedIn ? "Cerrar Sesión" : "Iniciar Sesión"}
          size='small-button'
          color={loggedIn ? "secondary-button" : "primary-button"}
          onClick={() => (loggedIn ? handleLogout() : handleLogin())}
        />
      </nav>
    </div>
  );
};

export default Navbar;
