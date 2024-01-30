import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import "./header.css";

const Header = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const isLogin = ctx.loginCheck;

  const logoutHandler = () => {
    navigate("/");
    ctx.logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/Home">Home</Link>
        <Link to="/Profile">Profile</Link>
        {isLogin && <Link to="/Expense">Expense</Link>}
      </div>

      <h3>Expense Tracker</h3>

      {isLogin && (
        <button className="logout-btn" onClick={logoutHandler}>
          Logout
        </button>
      )}

      {!isLogin && (
        <button className="logout-btn" onClick={() => navigate("/")}>
          Login
        </button>
      )}
    </nav>
  );
};

export default Header;
