import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state)=>state.auth.isAuthenticated);
  const dispatch=useDispatch();
  const logoutHandler = () => {
    navigate("/");
    dispatch(authActions.logout());
    
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
